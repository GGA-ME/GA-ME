from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.hooks.mysql_hook import MySqlHook
from steam_reviews import ReviewLoader
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
import requests
from time import sleep
import os
# MySQL 연결 설정
MYSQL_CONN_ID = 'mysql_default'

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 3, 14),
}

MAX_RETRIES = 3

def load_reviews_with_retry(game_id, max_reviews):
    retry_count = 0
    while retry_count < MAX_RETRIES:
        try:
            review_loader = ReviewLoader().set_language('koreana')
            reviews_kr = review_loader.load_from_api(game_id, max_reviews)
            return reviews_kr
        except requests.exceptions.SSLError as e:
            print(f"SSLError 발생: {e}")
            print("재시도 중...")
            retry_count += 1
            sleep(5)  # 재시도 전에 잠시 대기
    print(f"최대 재시도 횟수({MAX_RETRIES})를 초과하여 리뷰를 가져오지 못했습니다.")
    return None


def get_game_ids(**kwargs):
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()
    cursor.execute(f"SELECT game_id FROM game")
    game_ids = [row[0] for row in cursor.fetchall()]
    print(game_ids)
    cursor.close()
    conn.close()
    
    kwargs['ti'].xcom_push(key='game_ids', value=game_ids)
    return game_ids

def analyze_reviews(**kwargs):
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    
    ti = kwargs['ti']
    game_ids = ti.xcom_pull(task_ids='get_game_ids', key='game_ids')
    font_path = '/opt/airflow/wordcloud/NanumGothicBold.ttf'

    for game_id in game_ids:
        max_reviews = 1000
        reviews_kr = load_reviews_with_retry(game_id, max_reviews)

        if reviews_kr is not None:
            print("리뷰를 성공적으로 불러왔습니다.")
            print(reviews_kr.data['reviews'])
        else:
            print("리뷰를 불러오지 못했습니다.")
            continue

            
        if not reviews_kr.data['reviews'] or len(reviews_kr.data['reviews']) < 10:
            print(reviews_kr.data['reviews'])
            print(f"No reviews found for game ID: {game_id}")
            continue
        else:
            print(len(reviews_kr.data['reviews']))
        
        reviews = [review['review'] for review in reviews_kr.data['reviews']]
                
        # 불용어 목록 설정
        english_stopwords = set(STOPWORDS)
        # 사용하지 않을 단어들을 정의합니다.
        stopwords = set(['이', '있는', '수', '것', '다', 'h1', '그', '좀', '더','게임','정말','너무','다만','game', '그냥' ])  # 불용어 목록
        stopwords.update(english_stopwords)

        wordcloud = WordCloud(stopwords=stopwords, font_path=font_path, max_words=50, width=800, height=400, background_color='white').generate(' '.join(reviews))

        current_date = datetime.now().strftime('%Y%m%d')


        # 이미지 저장
        image_file_path = f'/opt/airflow/wordcloud/{game_id}_wordcloud_{current_date}.png'
        
        # 파일이 이미 존재하는지 확인하고 덮어쓰기
        if os.path.exists(image_file_path):
            os.remove(image_file_path)
        
        wordcloud.to_file(image_file_path)
        
        # 데이터베이스에 이미지 경로 저장
        try:
            cursor = conn.cursor()
            
            cursor.execute(f'''update game set game_word_cloud_url = '{image_file_path}' where game_id = {game_id}''')
            conn.commit()
            cursor.close()
            print("clear save wc")
        except Exception as e:
            print("fail db ", e)
    conn.close()


with DAG('dags_get_review_wordcloud', 
         default_args=default_args, 
         schedule_interval='@daily', 
         catchup=False) as dag:


    get_game_ids_task = PythonOperator(
        task_id='get_game_ids',
        python_callable=get_game_ids,
        provide_context=True,
        dag=dag
    )

    analyze_reviews_task = PythonOperator(
        task_id='analyze_reviews',
        python_callable=analyze_reviews,
        provide_context=True,
        dag=dag
    )

    get_game_ids_task >> analyze_reviews_task

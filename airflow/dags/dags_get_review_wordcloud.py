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

MAX_RETRIES = 10

def load_reviews_with_retry(game_id, max_reviews):
    retry_count = 0
    while retry_count < MAX_RETRIES:
        try:
            review_loader = ReviewLoader().set_language('koreana')
            reviews_kr = review_loader.load_from_api(game_id, max_reviews)
            return reviews_kr
        except Exception as e:
            print(f"재시도 중 Error 발생: {e}")
            retry_count += 1
            sleep(120)  # 재시도 전에 잠시 대기
    print(f"최대 재시도 횟수({MAX_RETRIES})를 초과하여 리뷰를 가져오지 못했습니다.")
    return None


def get_game_ids(**kwargs):
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()
    cursor.execute(f"SELECT game_id FROM game")
    game_ids = [row[0] for row in cursor.fetchall()]
    print(f'아이디 길이 {len(game_ids)}')
    cursor.close()
    conn.close()
    
    kwargs['ti'].xcom_push(key='game_ids', value=game_ids)
    return game_ids

def analyze_reviews(num_batches, index, **kwargs):
    ## TODO 얘는 partition은 상관 없나
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()

    
    game_ids = kwargs['ti'].xcom_pull(task_ids='game_ids_task', key='game_ids')
    game_id_batch = game_ids[index::num_batches]
    
    font_path = '/opt/airflow/wordcloud/bamin_doheon.ttf'

    for game_id in game_id_batch:
        max_reviews = 1000
        reviews_kr = load_reviews_with_retry(game_id, max_reviews)
        current_date = datetime.now().strftime('%Y%m%d')

        if reviews_kr is not None:
            pass
        else:
            print("리뷰를 불러오지 못했습   니다.")
            continue

            
        if not reviews_kr.data['reviews'] or len(reviews_kr.data['reviews']) < 30:
            continue

        
        reviews = [review['review'] for review in reviews_kr.data['reviews']]
                
        # 불용어 목록 설정
        english_stopwords = set(STOPWORDS)
        # 사용하지 않을 단어들을 정의합니다.
        stopwords = set(['이', 'ㅈㄴ', 'b', '하고', '합니다', '하지', '것이다', '내', '제대로', '때', '하며', '하는', '그럼', '통해',
                         '입니다', '하지만', '그래도', '하면', '이렇게', '있는', '수', '것', 'ㅅㅂ', '시발', '씨발', 'td', '플레이', 'play', '플레이를', '플레이하고',
                         '새끼', 'ㅈ', '다', 'h1', '그', '좀', '더','게임','정말','너무','다만','game', '그냥' ,'걸', '있습니다', '1과', '등등',
                         '그리고', '썅', 'https', 'h2', 'div', 'br', 'p', '같습니다', '애미', '같다', '게임', '게임을', '게임이', '게임의',
                         '게임에', '병신', '두', '할', '개씨발', '개시발', '섹스', 'th', 'civ', 'tr', 'Yetu', 'code', 'EC', 'EB', 'x86','h3','h4','h5','url','Fatal','Error', '게',
                         '안', '것인지', '맞은', '이런', '모든', '한', '잘', '있다', '근데', '이거', '같은', '어떤', '것을', '것이','사실', '등', '좀', '약간', 'B', 
                         ])  # 불용어 목록
        stopwords.update(english_stopwords)

        wordcloud = WordCloud(stopwords=stopwords, font_path=font_path, max_words=50, width=845, height=425, 
                              background_color='white').generate(' '.join(reviews))



        # 이미지 저장
        image_file_path = f'/opt/airflow/wordcloud/{game_id}.png'
        
        # 파일이 이미 존재하는지 확인하고 덮어쓰기
        if os.path.exists(image_file_path):
            os.remove(image_file_path)
        
        wordcloud.to_file(image_file_path)
        
        db_file_path = f'/wordCloud/{game_id}.png'
        
        # 데이터베이스에 이미지 경로 저장 `/wordCloud/게임ID.png'
        try:
            cursor.execute(f'''update game set game_word_cloud_url = '{db_file_path}' where game_id = {game_id}''')
            conn.commit()
        except Exception as e:
            print("fail db line 106", e)
    
    cursor.close()
    conn.close()


with DAG('dags_get_review_wordcloud', 
         
         default_args=default_args, 
         schedule_interval=None, 
         catchup=False) as dag:


    game_ids_task = PythonOperator(
        task_id='game_ids_task',
        python_callable=get_game_ids,
        provide_context=True,
        dag=dag
    )
    num_batches = 15  # 등분할 개수

    for i in range(num_batches):
        analyze_reviews_task = PythonOperator(
            task_id=f'analyze_reviews_batch_{i+1}',
            python_callable=analyze_reviews,
            op_kwargs={'index': i, 'num_batches':num_batches},
            provide_context=True,
            dag=dag
        )

        game_ids_task >> analyze_reviews_task

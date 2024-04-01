from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.mysql_operator import MySqlOperator
from airflow.hooks.mysql_hook import MySqlHook
from steam_reviews import ReviewLoader
import requests
from time import sleep

import nltk
nltk.download('vader_lexicon')

import math
import logging
from cassandra.cluster import Cluster

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pendulum
from pytz import timezone

log = logging.getLogger(__name__)


# MySQL 연결 설정
MYSQL_CONN_ID = 'mysql_default'

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1, tzinfo=timezone('Asia/Seoul')),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}
MAX_RETRIES = 5

def load_reviews_with_retry(game_id, max_reviews):
    retry_count = 0
    while retry_count < MAX_RETRIES:
        try:
            review_loader = ReviewLoader().set_language('english')
            reviews_en = review_loader.load_from_api(game_id, max_reviews)
        
            return reviews_en
        except Exception as e:
            print(f"Error 발생: {e}")
            #print("재시도 중...")
            retry_count += 1
            sleep(180)  # 재시도 전에 잠시 대기
    #print(f"최대 재시도 횟수({MAX_RETRIES})를 초과하여 리뷰를 가져오지 못했습니다.")
    return None


def get_game_ids(**kwargs):
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT game_id FROM game")
    game_ids = [row[0] for row in cursor.fetchall()]
    #print(game_ids)
    cursor.close()
    conn.close()
    # 현재 날짜와 시간을 가져옴
    current_date = datetime.now().date()

    # 문자열 형식으로 변환 ('YYYY-MM-DD' 형식)
    current_date_str = current_date.strftime('%Y-%m-%d')
    
    kwargs['ti'].xcom_push(key='started_dt', value=current_date_str)
    kwargs['ti'].xcom_push(key='game_ids', value=game_ids)
    return




def process_reviews(num_batches, index, **kwargs):
    analyzer = SentimentIntensityAnalyzer()
    updated_dt = kwargs['ti'].xcom_pull(task_ids='game_ids_task', key='started_dt')
    game_ids = kwargs['ti'].xcom_pull(task_ids='game_ids_task', key='game_ids')
    
    partitionSize = 250000 # TODO 유기적으로 적용가능하게 하기. ex) 24개의 태스크 12개의 파티션 -> 파티션당 25만개  TASK / Partition 값으로 partition = index//TP / partitionSize*index로 하면될듯?
    partition = index % 12
    
    game_id_batch = [game_id for game_id in game_ids if partition * partitionSize <= int(game_id) < (partition + 1) * partitionSize]

    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()
    # 카산드라 클러스터에 연결하기 위한 정보 설정
    cassandra_cluster = Cluster(['j10e105.p.ssafy.io'])
    cassandra_session = cassandra_cluster.connect('ggame')
    
    for game_id in game_id_batch:
        sleep(0.001)
        # 1. 최신 리뷰 날짜 가져오기
        # 카산드라에서 데이터를 가져오는 대신에 Python 코드에서 직접 최신 날짜를 계산
        query_latest_review_date = f"SELECT review_updated_dt FROM review_partition WHERE partition = {partition} AND game_id = {game_id}"
        rows = cassandra_session.execute(query_latest_review_date)

        # 최신 날짜를 초기화
        latest_review_date = None
        total_review_count = 0

        # 각 행을 반복하면서 최신 날짜 갱신
        if rows:
            total_review_count = sum(1 for _ in rows)
            # if total_review_count > 0:
            #     continue
            # else:
            #     print(total_review_count)
            #     pass
            for row in rows:
                total_review_count += 1
                review_date = row.review_updated_dt
                if latest_review_date is None or (review_date is not None and review_date > latest_review_date):
                    latest_review_date = review_date
                
        # 2차 댓글 받기할 때 사용하기
        # if 0 < total_review_count < 6000:
        #     continue


        max_reviews = 10000
        reviews_en = load_reviews_with_retry(game_id, max_reviews)

        if len(reviews_en):
            #print("리뷰를 성공적으로 불러왔습니다.")
            #print('game_id =', game_id)
            pass
        else:
            #print("리뷰를 불러오지 못했습니다.")
            continue

        if not reviews_en.data['reviews'] or len(reviews_en.data['reviews']) < 1:
            #print(f"No reviews found for game ID: {game_id}")
            continue
        else:
            #print('리뷰길이', len(reviews_en.data['reviews']))
            pass
            
            

        reviews_review = reviews_en.data['reviews']
        sorted_reviews = sorted(reviews_review, key=lambda x: x['timestamp_updated'], reverse=False) # 과거순 기준으로 정렬
        if latest_review_date is not None:
            sorted_reviews = [review for review in sorted_reviews if datetime.fromtimestamp(review['timestamp_updated']) > latest_review_date]
            if not sorted_reviews:
                continue
        
        game_review_cnt = reviews_en.data['query_summary']['total_reviews']

        # 그 뭐시냐 댓글 단 순간 평균 플레이 타임
        # sorted_reviews에서 각 review의 'author'의 'playtime_at_review' 값을 추출하여 리스트로 만듭니다.
        playtimes = [review_['author'].get('playtime_at_review', 0) for review_ in sorted_reviews]

        # 평균 playtime_at_review 계산
        average_playtime = sum(playtimes) / len(playtimes)

        # 평균 playtime_at_review의 10% 계산
        threshold = average_playtime * 0.1
        for review in sorted_reviews:
            #print('덱이 진행한 리뷰 개수', cnt)
            # 리뷰의 timestamp_created 값
            timestamp_created = review['timestamp_updated'] ## 컬럼 updated로 바꿔 줘야할 듯 ? db 날리고
            # UNIX timestamp를 datetime -> date 객체로 변환
            review_datetime = datetime.fromtimestamp(timestamp_created)
            review_updated_dt = review_datetime

            # game_id, review_id, review_content, review_is_good, review_updated_dt, 
            # review_playtime_at, review_playtime_total, review_playtime_recent
            # review_is_use, updated_dtm
            game_id = int(game_id)
            #print(type(review['recommendationid']), review['recommendationid'])
            review_id = int(review['recommendationid'])
            review_content = review['review']
            review_is_good = 'NULL'


            review_playtime_at = review['author'].get('playtime_at_review', 0)
            review_playtime_total = review['author'].get('playtime_forever', 0)
            review_playtime_recent = review['author'].get('playtime_last_two_weeks', 0)
            review_is_use = False
            updated_dtm = datetime.now()
            
            if review_playtime_at <= threshold:
                # 평균 플탐에 비해 10%이하인 댓글 배제 
                continue


            sleep(0.001)

            # TODO 업데이트 기준으로 과거 댓글은 긍/부정 X 문제는 과거 댓글인데 없는 댓글이면 UPDATE가 안된다.
            # 댓글의 긍/부정도가 마이너스로 박힘. 근데 만약 과거 댓글이어도 긍/부정을 돌린다면 플탐이 마이너스로 박힐 수 있음.
            # 그러면 긍/부정까지는 그냥하고, 플탐 증가가 False일 때 그냥 default가 되리라 믿고 값 안주고 insert?
            # 결론 ... 유지보수로 가정했을 때, 업데이트시간 기준으로 과거 댓글은 무시하는 방향으로 가거나 아래에서 1.3배만 받아주는식으로 업데이트 날려야 할듯.
            # 지금 당장은 그런거 없고 모두가 초기 데이터라 가정하고 받아야할듯, 분기처리 의미가 없다. 1번은 모두 받는 시기가 있어야함.
            
            # if latest_review_date is None or review_updated_dt > latest_review_date: 
            # 리뷰 저장 코드 작성
            scores = analyzer.polarity_scores(review_content)
            # {'neg': 0.0, 'neu': 0.308, 'pos': 0.692, 'compound': 0.6249}
            compound_score = scores['compound']
            if compound_score >= 0:
                #print("긍정적인 감정입니다.")
                review_is_good = True
            else:
                #print("부정적인 감정입니다.")
                review_is_good = False
            
            # 1.3배 이상 늘어난 현재 플탐인 경우 True로 바꿔줌
            if review_playtime_total is not None and review_playtime_at is not None:
                if review_playtime_total >= 1.3 * review_playtime_at:
                    review_is_use = True
            
            # 4. 리뷰 삽입 여길 쪼개자. 긍/부정까지는 하고 1.3배가 된 경우에는 값을 주고 안 된 경우에는 값을 빼자.
            # 이미 True라면 나머지 값만 UPDATE되고 그 값은 원래 값으로 사용 - 이거 안될듯
            try:
                insert_query = """INSERT INTO review_partition (partition, game_id, review_id, review_content, review_is_good, review_updated_dt, review_playtime_at, review_playtime_total, review_playtime_recent, review_is_use, updated_dtm) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                cassandra_session.execute(insert_query, (partition, game_id, review_id, review_content, review_is_good, review_updated_dt, review_playtime_at, review_playtime_total, review_playtime_recent, review_is_use, updated_dtm))
            except Exception as e:
                print("카산드라 데이터 저장 중 오류 발생:", e)

            # TODO 위의 TD랑 이어짐.그냥 나중에 유지보수 한다고 가정하면 여기서 업데이트가 옛날 것 인 경우에 플탐 고려해줄 거면 여기로
            # 근데 만약에 디비에 없는 댓글이라면 그냥 업데이트되지 못하고 쿼리가 소멸해버릴듯.
            # else:       
            #     ## 완탐 로직 플레이 시간 때문에 완탐하고 싶은 경우 필터링을 빼고 돌면서 과거 댓글인 경우 여기로 아니면 위에서 처리로 바꿔야할듯
            #     # 1.3배 이상 늘어난 현재 플탐인 경우 True로 바꿔줌
            #     if review_playtime_total is not None and review_playtime_at is not None:
            #         if review_playtime_total >= 1.3 * review_playtime_at:
            #             #print("존재하는 댓글 + 플탐 해당 OOOOOOOO")
            #             review_is_use = True
                        
            #             # 3. 리뷰 업데이트
            #             update_query = """UPDATE review_partition
            #                             SET review_is_use = %s, updated_dtm = %s
            #                             WHERE partition = %s AND game_id = %s AND review_id = %s"""
            #             cassandra_session.execute(update_query, (review_is_use, updated_dtm, partition, game_id, review_id))


            #         else:
            #             #print("존재하는 댓글 + 플탐 해당 X")
            #             review_is_use = False

        try:
            sql = """
                INSERT INTO game_score_info (game_id, game_review_cnt, game_review_like_cnt, game_review_unlike_cnt, updated_dt) 
                VALUES (%s, %s, %s, %s, %s) 
                ON DUPLICATE KEY UPDATE 
                    game_review_cnt = VALUES(game_review_cnt), 
                    game_review_like_cnt = VALUES(game_review_like_cnt), 
                    game_review_unlike_cnt = VALUES(game_review_unlike_cnt), 
                    updated_dt = VALUES(updated_dt)
            """
            cursor.execute(sql, (game_id, game_review_cnt, 0, 0, updated_dt))
            conn.commit()
            #print("Review 데이터가 성공적으로 저장되었습니다.")
        except Exception as e:
            conn.rollback()
            print("Review 데이터 저장 중 오류 발생:", e)
    cursor.close()
    conn.close()
    cassandra_session.shutdown()
    cassandra_cluster.shutdown()

     
     
     

def process_statistics(num_batches, index, **kwargs):
    
    print( " statistics Start :: !!!! ")
    # cnt = 0
    statistics_base_dt = kwargs['ti'].xcom_pull(task_ids='game_ids_task', key='started_dt')
    game_ids = kwargs['ti'].xcom_pull(task_ids='game_ids_task', key='game_ids')


    partitionSize = 250000
    partition = index % 12
    
    game_id_batch = [game_id for game_id in game_ids if partition * partitionSize <= game_id < (partition + 1) * partitionSize]

    # MySQL 연결 설정
    mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
    conn = mysql_hook.get_conn()
    cursor = conn.cursor()
    
    # 카산드라 클러스터에 연결하기 위한 정보 설정
    cassandra_cluster = Cluster(['j10e105.p.ssafy.io'])
    cassandra_session = cassandra_cluster.connect('ggame')
    

    for game_id in game_id_batch:        
        # 2. 게임 아이디에 해당하는 리뷰 정보 가져오기
        query_reviews = f"SELECT review_playtime_at, review_playtime_recent, review_is_use, review_is_good FROM review_partition WHERE partition = {partition} AND game_id = {game_id}"
        reviews = cassandra_session.execute(query_reviews)
        
        sleep(0.01)

        # 리뷰 정보를 담을 리스트 초기화
        review_list = []

        # 각 Row 객체에서 속성 추출하여 리스트에 저장
        for review in reviews:
            review_data = {
                'review_playtime_at': review.review_playtime_at,
                'review_playtime_recent': review.review_playtime_recent,
                'review_is_use': review.review_is_use,
                'review_is_good': review.review_is_good
            }
            review_list.append(review_data)

        reviews_length = sum(1 for _ in review_list) # sum(1 for _ in reviews)
        if  reviews_length > 0:
            #print(f"No reviews found for game ID: {game_id}")
            pass
        else:
            #print('리뷰 데이터', reviews)
            #print('리뷰길이', len(reviews))
            continue
        
        # 불러온 리뷰 리스트에서 game_review_is_use_cnt의 합계를 계산
        total_game_review_is_use_cnt = sum(review['review_is_use'] for review in review_list)
        positive_review = sum(1 for review in review_list if review['review_is_good'] == True)
        negative_review = sum(1 for review in review_list if review['review_is_good'] == False)
        query = f"UPDATE game_score_info SET game_review_is_use_cnt = {total_game_review_is_use_cnt}, game_review_like_cnt = {positive_review}, game_review_unlike_cnt = {negative_review} WHERE game_id = {game_id}"
        cursor.execute(query)
        conn.commit()
        
        
        
        
        # review_playtime_recent의 총합 계산
        total_playtime_recent = sum(review['review_playtime_recent'] for review in review_list)
        play_reviews_count = sum(1 for review in review_list if review['review_playtime_recent'] > 0)

        # TODO 최신 점수 앞 TASK로 옮길지 옮기려면 리뷰를 돌면서 review_playtime_recent를 더해놓고 마지막에 이 로직써야함. 아니면 앞에서 한 번에 처리하거나?
        # 이건 유지보수 과정에서 필수 인 것 같음 그 당시 받아왔을 때 리뷰 기준으로 값을 넣는게 맞는듯. 애초에 시간은 게임에 저장할 필요도 없음.
        # 왜냐면 항상 완탐할게 아니니까. 결국 update기준으로 걸러낼텐데 과거에 저장된 recent at은 의미가 없어진다.
        recent_score = ((1-(1/(1+math.log(total_playtime_recent + 1)))) + (1-(1/(1+math.log(play_reviews_count*100 + 1)))))*100
        if recent_score > 0:
            recent_score = round(recent_score, 4)
            query = """
                UPDATE game
                SET game_recent_score = %s
                WHERE game_id = %s
            """

            # 쿼리 실행
            cursor.execute(query, (recent_score, game_id))
            conn.commit()
        

        
        
        # 리뷰의 평균 플레이타임 계산
        total_playtime = sum(review['review_playtime_at'] for review in review_list)
        game_standard_playtime = total_playtime // reviews_length
        if game_standard_playtime < 1:
            continue

        # 시간대별로 긍정/부정 개수 계산
        positive_counts, negative_counts = count_reviews_by_time_bins(review_list, game_standard_playtime)
        #print("시간대별 긍정 리뷰 개수:", positive_counts)
        #print("시간대별 부정 리뷰 개수:", negative_counts)

        # SQL 쿼리 작성
        sql = """
            INSERT INTO statistics (
                statistics_like_0, statistics_like_10, statistics_like_20, statistics_like_30,
                statistics_like_40, statistics_like_50, statistics_like_60, statistics_like_70,
                statistics_like_80, statistics_like_90,
                statistics_unlike_0, statistics_unlike_10, statistics_unlike_20, statistics_unlike_30,
                statistics_unlike_40, statistics_unlike_50, statistics_unlike_60, statistics_unlike_70,
                statistics_unlike_80, statistics_unlike_90,
                game_standard_playtime, statistics_base_dt, game_id, created_dttm
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, NOW()
            ) ON DUPLICATE KEY UPDATE
                statistics_like_0 = VALUES(statistics_like_0),
                statistics_like_10 = VALUES(statistics_like_10),
                statistics_like_20 = VALUES(statistics_like_20),
                statistics_like_30 = VALUES(statistics_like_30),
                statistics_like_40 = VALUES(statistics_like_40),
                statistics_like_50 = VALUES(statistics_like_50),
                statistics_like_60 = VALUES(statistics_like_60),
                statistics_like_70 = VALUES(statistics_like_70),
                statistics_like_80 = VALUES(statistics_like_80),
                statistics_like_90 = VALUES(statistics_like_90),
                statistics_unlike_0 = VALUES(statistics_unlike_0),
                statistics_unlike_10 = VALUES(statistics_unlike_10),
                statistics_unlike_20 = VALUES(statistics_unlike_20),
                statistics_unlike_30 = VALUES(statistics_unlike_30),
                statistics_unlike_40 = VALUES(statistics_unlike_40),
                statistics_unlike_50 = VALUES(statistics_unlike_50),
                statistics_unlike_60 = VALUES(statistics_unlike_60),
                statistics_unlike_70 = VALUES(statistics_unlike_70),
                statistics_unlike_80 = VALUES(statistics_unlike_80),
                statistics_unlike_90 = VALUES(statistics_unlike_90),
                game_standard_playtime = VALUES(game_standard_playtime),
                created_dttm = NOW();
        """

        # SQL 쿼리 실행
        cursor.execute(sql, (
            *positive_counts, *negative_counts, game_standard_playtime, statistics_base_dt, game_id
        ))

    # 연결 종료
    cursor.close()
    conn.close()
    cassandra_session.shutdown()
    cassandra_cluster.shutdown()

# 리뷰 데이터에서 시간대별 긍정/부정 개수를 계산하는 함수
def count_reviews_by_time_bins(reviews, average_playtime):
    # 평균 플레이타임을 기준으로 시간대를 분할
    length = len(str(average_playtime))  # 숫자의 길이를 구함
    if length == 1:
        time_bin = average_playtime
    else:
        time_bin = round(average_playtime, -length + 2) // 5  # 첫 번째 자리를 제외하고 반올림
    
    # 시간대별로 긍정/부정 개수를 저장할 리스트 초기화
    positive_counts = [0] * 10
    negative_counts = [0] * 10
    # 리뷰를 순회하면서 시간대별로 개수를 세기
    for review in reviews:
        review_playtime_at = review['review_playtime_at']  # 리뷰의 플레이타임
        review_is_good = review['review_is_good']  # 리뷰의 긍정/부정 여부
        
        # 플레이타임을 시간대로 변환
        time_index = min(math.ceil(review_playtime_at / time_bin), 10) - 1

        # 리뷰가 긍정인 경우 해당 시간대의 긍정 개수를 증가
        if review_is_good:
            positive_counts[time_index] += 1
        # 리뷰가 부정인 경우 해당 시간대의 부정 개수를 증가
        else:
            negative_counts[time_index] += 1

    return positive_counts, negative_counts


def get_game_final_score(index, num_batches, **kwargs):
    game_ids = kwargs["ti"].xcom_pull(task_ids = 'game_ids_task', key="game_ids")

    if not game_ids:
        #print('applist :', game_ids)
        return
    else:
        #print('applist 존재')
        pass
    
    partitionSize = 250000
    partition = index % 12
    
    game_id_batch = [game_id for game_id in game_ids if partition * partitionSize <= game_id < (partition + 1) * partitionSize]

    try:
        # MySQL 연결 설정
        mysql_hook = MySqlHook(mysql_conn_id=MYSQL_CONN_ID)
        conn = mysql_hook.get_conn()
        cursor = conn.cursor()

        for game_id in game_id_batch:
            sleep(0.01)

            #print("################### CALCULATE GAME SCORE!!!#######################")

            # 가장 최근 갱신된 점수 정보 가져오기
            select_query = f'''select 
            g.game_id
            , gsi.game_review_cnt
            , gsi.game_review_like_cnt
            , gsi.game_review_unlike_cnt
            , gsi.game_review_is_use_cnt
            , g.game_recent_score
            , gsi.updated_dt
            from game_score_info gsi
            join game g
            on gsi.game_id = g.game_id
            where gsi.game_id = {game_id}
            order by updated_dt desc'''

            cursor.execute(select_query) 

            select_result = cursor.fetchall()
            #print("SELECT_RESULT:: " ,select_result)
            if not select_result:
                continue

            # 필요한 값 추출
            game_id = select_result[0][0]
            game_review_cnt = select_result[0][1]
            game_review_like_cnt = select_result[0][2]
            game_review_unlike_cnt = select_result[0][3]
            game_review_is_use_cnt = select_result[0][4]
            game_recent_score = select_result[0][5]

            # 점수 계산
            review_cnt_score = 100 * ( math.log(game_review_cnt**2 + 1) / (8 + math.log(game_review_cnt**2 + 1))) # 리뷰 개수 점수
            
            if game_review_like_cnt + game_review_unlike_cnt != 0:
                review_like_score = (game_review_like_cnt / (game_review_like_cnt + game_review_unlike_cnt)) * 100 # 댓글 선호도 점수
                in_use_score = 100 * (math.log(game_review_is_use_cnt + 1) / (5 + math.log(game_review_is_use_cnt + 1))) # 증가한 사용자 비율 점수
            else:
                review_like_score = 0
                in_use_score = 0
            game_final_score = round(review_cnt_score * 0.8 + max(review_like_score, 50) * 0.1 + in_use_score * 0.1, 4) # 최종 점수(소숫점 아래 4째 자리까지)

            # game_final_recent_score 점수 계산
            game_final_recent_score = round(game_final_score * 0.8 + game_recent_score * 0.2, 4) # 최신 게임 가치 점수(수숫점 아래 4쨰 자리까지 )


            # game db에 점수 저장하기
            update_query = """update game set game_final_score =%s, game_final_recent_score = %s where game_id =%s"""
            cursor.execute(update_query, (game_final_score, game_final_recent_score, game_id))
            conn.commit()
            #print("game_final_score 업데이트 완료!")

    except Exception as e:
        log.fatal("get_game_score에서 예외 발생:: ", e)


with DAG('dags_get_save_data_statis', 
        default_args=default_args, 
        schedule_interval=None,
        tags=["please","mysql","test"],
        catchup=False) as dag:
    
    num_batches = 12  # 등분할 개수
    game_ids_task = PythonOperator(
        task_id='game_ids_task',
        python_callable=get_game_ids,
        provide_context=True,
        dag=dag
    )

    for i in range(num_batches):
        # process_reviews_task = PythonOperator(
        #     task_id=f'process_reviews_batch_{i+1}',
        #     python_callable=process_reviews,
        #     op_kwargs={'index': i, 'num_batches':num_batches},
        #     provide_context=True,
        #     dag=dag
        # )
        process_statistics_task = PythonOperator(
            task_id=f'process_statistics_batch_{i+1}',
            python_callable=process_statistics,
            op_kwargs={'index': i, 'num_batches':num_batches},
            provide_context=True,
            dag=dag
        )

        get_game_final_score_task = PythonOperator(
            task_id=f'get_game_final_score_batch_{i+1}',
            python_callable=get_game_final_score,
            op_kwargs={'index': i, 'num_batches':num_batches},
            provide_context=True,
            dag=dag
        )

        # game_ids_task >> process_reviews_task >> process_statistics_task >> get_game_final_score_task
        # game_ids_task >> process_reviews_task >> process_statistics_task 
        game_ids_task >> process_statistics_task >> get_game_final_score_task 
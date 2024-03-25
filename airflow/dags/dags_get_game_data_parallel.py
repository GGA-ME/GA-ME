from __future__ import annotations

import logging
import sys
import time
from pprint import pprint
import math

import pendulum
# import pymysql
from airflow.operators.dagrun_operator import TriggerDagRunOperator
from airflow.models.dag import DAG
from airflow.operators.python import (
    PythonOperator
)

log = logging.getLogger(__name__)

PATH_TO_PYTHON_BINARY = sys.executable

# MySQL Connector Python을 임포트합니다.
import mysql.connector
from mysql.connector import errorcode

# 외부 api 요청을 위해 임포트
import requests
# json 객체 관련 작업을 위해 임포트
import json
# 문자열을 datetime으로 바꾸기 위해 임포트
from datetime import datetime, timedelta
from pytz import timezone


# MySQL 연결 정보를 설정합니다.
MYSQL_HOST = 'j10e105.p.ssafy.io'
MYSQL_PORT = '3306'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'GGAME!buk105'
MYSQL_DATABASE = 'ggame'

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1, tzinfo=timezone('Asia/Seoul')),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}


# 커넥션 생성
conn = mysql.connector.connect(
    host=MYSQL_HOST,
    port=MYSQL_PORT,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DATABASE
)

# 커서 생성
cursor = conn.cursor()


MAX_RETRIES = 5

def load_game_detail_retry(app, game_datail_url):
    retry_count = 0
    while retry_count < MAX_RETRIES:
        try:
            time.sleep(180)
            detail_res = requests.get(game_datail_url)
            if detail_res.status_code != 200:
                # 다시 받아오는데 실패를 하면 재시도
                log.info(f"[{app.get('appid')}] - {retry_count}번쨰 시도도 실패했습니다")
                retry_count += 1
            else:
                insert_game_data(app, detail_res)
                return 
        except Exception as e:
            log.info("load_game_detail_retry 중 에러 발생:: ", e)


# def update_game_data(app_id, detail_json):
#    #print("###################UPDATE GAME DATA RUN!!!#######################")
#     detail_body = detail_json.get(app_id).get("data")
#     # game객체에 필요한 값 추출
#     game_id = app_id
#     game_name = detail_body.get("name").replace('"', '')
#     game_short_description = detail_body.get("short_description").replace('"', '')
#     # 상세설명이 길어서 MEDIUMTEXT 형식으로 저장
#     game_detailed_description = detail_body.get("detailed_description").replace('"', '')
#     game_header_img = detail_body.get("header_image")
#     if not detail_body.get("website"):
#         log.info("NO WESITE")
#         game_website = ""
#     game_website = detail_body.get("website")
#     # devloper list를 문자열로
#     if not detail_body.get("developers"):
#        #print("NO DEVELOPER")
#         game_developer = ""
#     else:
#         game_developer = ', '.join([element.replace('"', '') for element in detail_body.get("developers")])
#     # publisher list를 문자열로
#     game_publisher = ', '.join([element.replace('"', '') for element in detail_body.get("publishers")])
#     if not detail_body.get("price_overview") :
#         log.info("NO PRICE OVERVIEW")
#         game_price_initial = 0
#         game_price_final = 0
#         game_discount_percent = 0
#     else:
#         game_price_initial = detail_body.get("price_overview").get("initial")
#         game_price_final = detail_body.get("price_overview").get("final")
#         game_discount_percent = detail_body.get("price_overview").get("discount_percent")
#     # game_release_date는 문자열로 저장(형태가 너무 다양함)
#     game_release_date = detail_body.get("release_date").get("date").replace('"', '')
    
#     # list를 json 객체로 만든 후 저장
#     screenshots_json = {
#         "screenshots": detail_body.get("screenshots")
#     } 
#     json_game_screenshot_img = json.dumps(screenshots_json) # json 객체를 문자열로 변환
#     game_screenshot_img = json_game_screenshot_img
    

#     # # mysql db에 업데이트
#     query = f"""
#     update game 
#     set 
#     game_name = "{game_name}"
#     , game_short_description = "{game_short_description}"
#     , game_detailed_description = "{game_detailed_description}"
#     , game_header_img = "{game_header_img}"
#     , game_website = "{game_website}"
#     , game_developer = "{game_developer}"
#     , game_publisher = "{game_publisher}"
#     , game_price_initial = {game_price_initial}
#     , game_price_final = {game_price_final}
#     , game_discount_percent = {game_discount_percent}
#     , game_release_date = "{game_release_date}"
#     , game_screenshot_img = '{game_screenshot_img}'
#     , updated_dt = now()
    
#     where  game_id = {game_id}
#     """
#    #print("update query:::", query)
#     # 쿼리 실행
#     cursor.execute(query)

    
#     # 태그 카테고리 제발요
#     get_tag_category(app_id, detail_json)


#     conn.commit()
#    #print("update commit", app_id)

def for_tag(game_id, code_id, list):
    for element in list:
        # 태그 테이블에 존재하지 않는 카테고리라면 태그 테이블이 추가
        tag_id = element['id']
        tag_name = element['description']
        is_exist_query = f"select * from tag where code_id = '{code_id}' and tag_id = {tag_id}"
        cursor.execute(is_exist_query)
        result = cursor.fetchone()
       #print("result::::::::::::", result)
        if result is None:
            insert_tag_query = f"insert into tag (code_id, tag_id, tag_name) values ('{code_id}', {tag_id}, '{tag_name}')"
            cursor.execute(insert_tag_query)
            conn.commit()
           #print("insert into tag :: ", tag_id, "-" ,tag_name)
            
        # game_tag 테이블에 추가
        try:
            # TODO: 중복 태그 저장 방지
            is_exist_query = f"select * from game_tag where code_id = {code_id} and tag_id = {tag_id} where game_id = {game_id}"
            cursor.execute(is_exist_query)
            result = cursor.fetchAll()
           #print("result::: ", len(result))

            if(len(result) < 1):
                insert_game_tag_query = f"insert into game_tag (game_id, tag_id, code_id) values ({game_id}, {tag_id}, '{code_id}')"
                cursor.execute(insert_game_tag_query)
                conn.commit()
               #print("insert into game_tag :: ", game_id, " - ", tag_id, " - ", code_id)
                
        except mysql.connector.Error as err:
            if isinstance(err, mysql.connector.IntegrityError) and err.errno == 1062:
                print("for_tag 함수에서 중복 키 오류 발생:", err)
                continue   
            else:
               print("for_tag 함수에서 MySQL 커넥터 오류:", err)
        
def get_tag_category(game_id, detail_json):
    detail_body = detail_json.get(game_id).get("data")
    categories = detail_body.get("categories")
    genres = detail_body.get("genres")
   #print("#####categories:::", categories)
   #print("#####genres:::", genres)
    
    if categories is not None:  
        for_tag(game_id, 'CAT', categories)

    if genres is not None: 
        for_tag(game_id, 'GEN', genres)
            
def get_game_id_list(**kwargs):

    # 게임 목록 API 요청
    game_list_url = "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    res = requests.get(game_list_url)

    try:
        if res.status_code != 200:
            raise Exception("게임리스트를 받아오는데 실패했습니다.")
        else:
            # 게임 id-name 받아오기
            res_json = res.json()
            applist = res_json.get("applist").get("apps")
            ##print(applist[0])
           #print(len(applist))
            kwargs['ti'].xcom_push(key='game_id_list', value=applist)
            return applist
    except Exception as e:
        log.fatal("게임 아이디 리스트 받아오기에서 예외 발생 :: ", e)

def get_game_final_score(index, num_batches, **kwargs):
    game_ids = kwargs["ti"].xcom_pull(task_ids = 'game_ids_task', key="game_ids")

    if not game_ids:
       #print('applist :', game_ids)
        return
    else:
       #print('applist 존재')

    game_id_batch = game_ids[index::num_batches]

    try:
        for game_id in game_id_batch:

           #print("################### CALCULATE GAME SCORE!!!#######################")

            # 가장 최근 갱신된 점수 정보 가져오기
            select_query = f'''select 
            game_id
            , game_review_cnt
            , game_review_like_cnt
            , game_review_unlike_cnt
            , game_review_is_use_cnt
            , updated_dt
            from game_score_info
            where game_id ={game_id}
            order by updated_dt desc'''

            cursor.execute(select_query) 

            select_result = cursor.fetchall()
           #print("SELECT_RESULT:: " ,select_result)

            # 필요한 값 추출
            game_id = select_result[0][0]
            game_review_cnt = select_result[0][1]
            game_review_like_cnt = select_result[0][2]
            game_review_unlike_cnt = select_result[0][3]
            game_review_is_use_cnt = select_result[0][4]

            # 점수 계산
            review_cnt_score = 100 * (1 - 1 / (1 + math.log(game_review_cnt + 1))) # 리뷰 개수 점수
            review_like_score = (game_review_like_cnt / (game_review_like_cnt + game_review_unlike_cnt)) * 100 # 댓글 선호도 점수
            in_use_score = (game_review_is_use_cnt / (game_review_like_cnt + game_review_unlike_cnt)) * 100 # 증가한 사용자 비율 점수

            game_final_score = review_cnt_score * 0.3 + review_like_score * 0.3 + in_use_score * 0.4 # 최종 점수


            # game db에 점수 저장하기
            update_query = f"""update game set game_final_score ={game_final_score} where game_id ={game_id}"""
            cursor.execute(update_query)
            conn.commit()
           #print("game_final_score 업데이트 완료!")

    except Exception as e:
        log.fetal("get_game_score에서 예외 발생:: ", e)


def insert_game_data(app, detail_res):
    app_id = str(app.get("appid"))

    detail_json = detail_res.json()

    if not detail_json.get(app_id).get("success") :
        log.info(f"{app.get('appid')}번 게임 상세 정보가 존재하지 않습니다.")
        
    else:
        try:
            # 데이터가 존재하지 않을 때 insert
           #print("################### INSERT GAME DATA !!!#######################")
            detail_body = detail_json.get(app_id).get("data")
            # game객체에 필요한 값 추출
            game_id = app_id
            ##print("game_id ", game_id)
            game_name = detail_body.get("name").replace('"', '')
            ##print("game_name ", game_name)
            game_short_description = detail_body.get("short_description").replace('"', '')
            ##print("game_short_description ", game_short_description)
            # 상세설명이 길어서 Blob데이터 형식으로 저장 (인코딩 방식은 utf-8)
            game_detailed_description = detail_body.get("detailed_description").replace('"', '')
            ##print("game_detailed_description ", game_detailed_description)
            game_header_img = detail_body.get("header_image")
            ##print("game_header_img ", game_header_img)
            if not detail_body.get("website"):
                log.info("@@@@@@ no website")
                game_website = ""
            game_website = detail_body.get("website")
            ##print("game_website: ", game_website)
            # devloper list를 문자열로
            if not detail_body.get("developers"):
               #print("@@@@@@@@ no developer")
                game_developer = ""
            else:
                game_developer = ', '.join([element.replace('"', '') for element in detail_body.get("developers")])
            ##print("game_developer: ", game_developer)
            # publisher list를 문자열로
            game_publisher = ', '.join([element.replace('"', '') for element in detail_body.get("publishers")])
           #print("game_publisher: ", game_publisher)
            if not detail_body.get("price_overview") :
                log.info("@@@@@@@@@@ no price overview")
                game_price_initial = 0
                game_price_final = 0
                game_discount_percent = 0
            else:
                game_price_initial = detail_body.get("price_overview").get("initial")
                ##print("game_price_initial ",game_price_initial )
                game_price_final = detail_body.get("price_overview").get("final")
                ##print("game_price_final: ", game_price_final)
                game_discount_percent = detail_body.get("price_overview").get("discount_percent")
                ##print("game_discount_percent: ", game_discount_percent)

            # 문자열로 받은 release_date를 date type으로 저장
            game_release_date = detail_body.get("release_date").get("date").replace('"', '')
            
            # list를 json 객체로 만든 후 저장
            screenshots_json = {
                "screenshots": detail_body.get("screenshots")
            } 
            json_game_screenshot_img = json.dumps(screenshots_json)
            ##print("screenshots_json:::::::::", screenshots_json)
            game_screenshot_img = json_game_screenshot_img
            
            query = """
            insert into game 
            (
            game_id
            , game_name
            , game_short_description
            , game_detailed_description
            , game_header_img
            , game_website
            , game_developer
            , game_publisher
            , game_price_initial
            , game_price_final
            , game_discount_percent
            , game_release_date
            , game_screenshot_img
            , updated_dt
            ) 
            values (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, now()
            )
            on duplicate key update
            game_name = VALUES(game_name),
            game_short_description = VALUES(game_short_description),
            game_detailed_description = VALUES(game_detailed_description),
            game_header_img = VALUES(game_header_img),
            game_website = VALUES(game_website),
            game_developer = VALUES(game_developer),
            game_publisher = VALUES(game_publisher),
            game_price_initial = VALUES(game_price_initial),
            game_price_final = VALUES(game_price_final),
            game_discount_percent = VALUES(game_discount_percent),
            game_release_date = VALUES(game_release_date),
            game_screenshot_img = VALUES(game_screenshot_img),
            updated_dt = VALUES(updated_dt)
            """
           #print("insert query:::", query)

            # 쿼리 실행
            cursor.execute(query, (
                game_id, 
                game_name, 
                game_short_description, 
                game_detailed_description, 
                game_header_img, 
                game_website, 
                game_developer, 
                game_publisher,
                game_price_initial, 
                game_price_final, 
                game_discount_percent, 
                game_release_date, 
                game_screenshot_img
                ))
            conn.commit()

                # 태그 카테고리 제발요
            get_tag_category(app_id, detail_json)

        except mysql.connector.Error as err:
        #    #print("MYSQL CONNECTOR ERROR:::", err)
        #     continue
            # if isinstance(err, mysql.connector.IntegrityError) and err.errno == 1062:
            #    #print("중복 키 오류 발생:", err)
            #     update_game_data(app_id, detail_json)
                
            # else:
            print("MySQL 커넥터 오류:", err)



def get_game_data(index, num_batches, **kwargs):
    applist = kwargs["ti"].xcom_pull(task_ids = 'get_game_id_list_task', key="game_id_list")

    if not applist:
       #print('applist :', applist)
        return
    else:
       #print('applist 존재')

    game_id_batch = applist[index::num_batches]
   #print("game_id_batch::", game_id_batch)

        # 받은 리스트 순회하며 상세정보 저장하기
        #for idx, app in enumerate(applist):
    for idx, app in enumerate(game_id_batch):
        try:
           #print("app [%d]: " %idx, app)

            # appid 변수 설정
            appid = app.get("appid")

            # 게임이 존재하면 다음 함수를 실행하지 않음
            if check_game_existence(appid):
                continue
            
            # 게임 상세 정보 API 요청
            game_detail_url = f'https://store.steampowered.com/api/appdetails?appids={app.get("appid")}&l=koreana'
            detail_res = requests.get(game_detail_url)

            if detail_res.status_code != 200:
                log.info(f"{app.get('appid')}번 게임 상세 정보를 받아오는데 실패했습니다.")
                log.info(f"{app.get('appid')}번 게임 상세정보 받기 재시도 시작")
                load_game_detail_retry(app, game_detail_url)
            else: 
                insert_game_data(app, detail_res)      
        # 중복된 키를 발견했을 때 수행할 작업 추가
        except Exception as e:
            log.info("게임 상세 정보 받아오기 에서 예외 발생 :: ", e)
            
    cursor.close()
    conn.close()

def check_game_existence(appid):

    # 게임이 존재하는지 확인하는 쿼리 실행
    query = f"SELECT COUNT(*) FROM game WHERE game_id = {appid}"
    cursor.execute(query)
    result = cursor.fetchone()[0]

    # 게임이 존재하면 True 반환, 존재하지 않으면 False 반환
    return result > 0



with DAG(
    dag_id="dags_get_game_data_parallel",
    default_args=default_args, 
    schedule="@weekly",
    catchup=False,
    tags=["please","mysql","test"],
) as dag:
    trigger_statis_dag = TriggerDagRunOperator(
        task_id="trigger_statis_dag",
        trigger_dag_id="dags_get_save_data_statis",  # 다음 DAG의 ID
        execution_date="{{ execution_date }}"
    )
    
    run_get_game_id_list_task = PythonOperator(
        task_id="get_game_id_list_task",
        python_callable = get_game_id_list,
        provide_context = True
    )

    # 등분할 개수
    num_batches = 10
    
    for i in range(num_batches):
        run_get_game_data_task = PythonOperator (
            task_id = f"get_game_data_task_{i+1}", 
            python_callable=get_game_data,
            op_kwargs = {
                'index': i, 'num_batches': num_batches
            },
            provide_context=True
        )
        run_get_game_id_list_task >> run_get_game_data_task >> trigger_statis_dag


    
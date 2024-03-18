import logging
import requests
import json
from datetime import datetime
import pandas as pd
from airflow.models.dag import DAG
from airflow.operators.python import PythonOperator
import mysql.connector
import pendulum
import datetime

log = logging.getLogger(__name__)

MYSQL_HOST = 'j10e105.p.ssafy.io'
MYSQL_PORT = '3306'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'GGAME!buk105'
MYSQL_DATABASE = 'ggame'

def get_game_data():
    # MySQL 연결 설정
    conn = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )
    
    # 데이터프레임 초기화
    game_df = pd.DataFrame()

    # 게임 목록 API 요청
    game_list_url = "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    res = requests.get(game_list_url)
    
    if res.status_code != 200:
        raise Exception("게임리스트를 받아오는데 실패했습니다.")
        
    applist = res.json().get("applist").get("apps")
    for app in applist:
        app_id = app.get("appid")
        game_detail_url = f'https://store.steampowered.com/api/appdetails?appids={app_id}&language=korean'
        detail_res = requests.get(game_detail_url)

        if detail_res.status_code != 200:
            log.info(f"{app_id}번 게임 상세 정보를 받아오는데 실패했습니다.")
            continue

        detail_json = detail_res.json()
        if not detail_json.get(str(app_id)).get("success"):
            log.info(f"{app_id}번 게임 상세 정보가 존재하지 않습니다.")
            continue

        detail_body = detail_json.get(str(app_id)).get("data")
        game_data = {
            "game_id": app_id,
            "game_name": detail_body.get("name"),
            "game_short_description": detail_body.get("short_description"),
            "game_detailed_description": detail_body.get("detailed_description"),
            "game_header_img": detail_body.get("header_image"),
            "game_website": detail_body.get("website", ""),
            "game_developer": ", ".join(detail_body.get("developers", [])),
            "game_publisher": ", ".join(detail_body.get("publishers", [])),
            "game_price_initial": detail_body.get("price_overview", {}).get("initial", 0),
            "game_price_final": detail_body.get("price_overview", {}).get("final", 0),
            "game_discount_percent": detail_body.get("price_overview", {}).get("discount_percent", 0),
            "game_release_date": detail_body.get("release_date", {}).get("date"),
            "game_screenshot_img": json.dumps({"screenshots": detail_body.get("screenshots", [])}),
            "updated_dt" : datetime.datetime.now()
        }
        game_df = pd.concat([game_df, pd.DataFrame([game_data])], ignore_index=True)


    # MySQL에 DataFrame을 저장
    game_df.to_sql('game', conn, if_exists='replace', index=False)

    # MySQL 연결 종료
    conn.close()

with DAG(
    dag_id="dags_get_data_pandas",
    schedule="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="Asia/Seoul"),
    catchup=False,
    tags=["please", "mysql", "test"],
):
    run_get_game_data_task = PythonOperator(task_id="get_game_data_task", python_callable=get_game_data)
    run_get_game_data_task
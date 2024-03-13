from __future__ import annotations

import logging
import sys
import time
from pprint import pprint

import pendulum
# import pymysql

from airflow.models.dag import DAG
from airflow.operators.python import (
    PythonOperator
)

log = logging.getLogger(__name__)

PATH_TO_PYTHON_BINARY = sys.executable

# MySQL Connector Python을 임포트합니다.
import mysql.connector

# 외부 api 요청을 위해 임포트
import requests
# json 객체 관련 작업을 위해 임포트
import json

# MySQL 연결 정보를 설정합니다.
MYSQL_HOST = 'j10e105.p.ssafy.io'
MYSQL_PORT = '3306'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'GGAME!buk105'
MYSQL_DATABASE = 'test'


with DAG(
    dag_id="dags_get_game_data",
    schedule="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="Asia/Seoul"),
    catchup=False,
    tags=["please","mysql","test"],
):
    

    # [START howto_operator_python]
    # ===============================================================
    # 내가 지정한 태스크
    def get_game_data():

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

        # 게임 목록 api 요청
        game_list_url = "https://api.steampowered.com/ISteamApps/GetAppList/v2"
        response = requests.get(game_list_url)
    
        try:
            if response.status_code != 200:
                raise Exception("게임리스트를 받아오는데 실패했습니다.")
            else:
                # 게임 id-name 받아오기
                res_json = response.json()
                applist = res_json.get("applist").get("apps")
                print(applist[0])
                print(len(applist))
            
        except Exception as e:
            log.info("예외 발생:: ", e)

        cursor.close()
        conn.close()

    run_get_game_data_task = PythonOperator(task_id="get_game_data_task", python_callable=get_game_data)

    #test_task = MysqlOperator()

    run_get_game_data_task
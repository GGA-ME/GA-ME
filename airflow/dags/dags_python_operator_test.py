
from __future__ import annotations

import logging
import sys
import time
from pprint import pprint

import pendulum
# import pymysql

from airflow.models.dag import DAG
from airflow.operators.python import (
    ExternalPythonOperator,
    PythonOperator,
    PythonVirtualenvOperator,
    is_venv_installed,
)

log = logging.getLogger(__name__)

PATH_TO_PYTHON_BINARY = sys.executable

# MySQL Connector Python을 임포트합니다.
import mysql.connector

# MySQL 연결 정보를 설정합니다.
MYSQL_HOST = 'j10e105.p.ssafy.io'
MYSQL_PORT = '3306'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'GGAME!buk105'
MYSQL_DATABASE = 'test'


with DAG(
    dag_id="dags_python_operator_test",
    schedule="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="Asia/Seoul"),
    catchup=False,
    tags=["please","mysql","test"],
):
    # [START howto_operator_python]
    # ===============================================================
    # 내가 지정한 태스크
    def my_task():

        log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

        conn = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
        )

        # 커서를 생성합니다.
        cursor = conn.cursor()

        # 샘플 쿼리를 실행합니다.
        query = "SELECT idtest1, test1col FROM test1"
        cursor.execute(query)
        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

        # 결과를 가져옵니다.
        rows = cursor.fetchall()
        for row in rows:
            print(row)

        # 커넥션을 닫습니다.
        cursor.close()
        conn.close()

        # 로그
        log.info("pleeeeaaaaaaaaaassssssssseeeeeeeeeeee")

    run_my_task = PythonOperator(task_id="insert_the_data", python_callable=my_task)


    run_my_task

    # =================================================================

    # def print_context(ds=None, **kwargs):
    #     """Print the Airflow context and ds variable from the context."""
    #     pprint(kwargs)
    #     print(ds)
    #     return "Whatever you return gets printed in the logs!!!!!!"

    # run_this = PythonOperator(task_id="print_the_context", python_callable=print_context)
    # # [END howto_operator_python]

    # # [START howto_operator_python_render_sql]
    # def log_sql(**kwargs):
    #     logging.info("Python task decorator query: %s", str(kwargs["templates_dict"]["query"]))

    # log_the_sql = PythonOperator(
    #     task_id="log_sql_query",
    #     python_callable=log_sql,
    #     templates_dict={"query": "sql/sample.sql"},
    #     templates_exts=[".sql"],
    # )
    # # [END howto_operator_python_render_sql]

    # # [START howto_operator_python_kwargs]
    # # Generate 5 sleeping tasks, sleeping from 0.0 to 0.4 seconds respectively
    # def my_sleeping_function(random_base):
    #     """This is a function that will run within the DAG execution"""
    #     time.sleep(random_base)

    # for i in range(5):
    #     sleeping_task = PythonOperator(
    #         task_id=f"sleep_for_{i}", python_callable=my_sleeping_function, op_kwargs={"random_base": i / 10}
    #     )

    #     run_this >> log_the_sql >> sleeping_task
    # # [END howto_operator_python_kwargs]

    # if not is_venv_installed():
    #     log.warning("The virtalenv_python example task requires virtualenv, please install it.")
    # else:
    #     # [START howto_operator_python_venv]
    #     def callable_virtualenv():
    #         """
    #         Example function that will be performed in a virtual environment.

    #         Importing at the module level ensures that it will not attempt to import the
    #         library before it is installed.
    #         """
    #         from time import sleep

    #         from colorama import Back, Fore, Style

    #         print(Fore.RED + "some red text")
    #         print(Back.GREEN + "and with a green background")
    #         print(Style.DIM + "and in dim text")
    #         print(Style.RESET_ALL)
    #         for _ in range(4):
    #             print(Style.DIM + "Please wait...", flush=True)
    #             sleep(1)
    #         print("Finished")

    #     virtualenv_task = PythonVirtualenvOperator(
    #         task_id="virtualenv_python",
    #         python_callable=callable_virtualenv,
    #         requirements=["colorama==0.4.0"],
    #         system_site_packages=False,
    #     )
    #     # [END howto_operator_python_venv]

    #     sleeping_task >> virtualenv_task

    #     # [START howto_operator_external_python]
    #     def callable_external_python():
    #         """
    #         Example function that will be performed in a virtual environment.

    #         Importing at the module level ensures that it will not attempt to import the
    #         library before it is installed.
    #         """
    #         import sys
    #         from time import sleep

    #         print(f"Running task via {sys.executable}")
    #         print("Sleeping")
    #         for _ in range(4):
    #             print("Please wait...", flush=True)
    #             sleep(1)
    #         print("Finished")

    #     external_python_task = ExternalPythonOperator(
    #         task_id="external_python",
    #         python_callable=callable_external_python,
    #         python=PATH_TO_PYTHON_BINARY,
    #     )
    #     # [END howto_operator_external_python]

    #     run_this >> external_python_task >> virtualenv_task
from datetime import datetime, timedelta
from airflow import DAG

from airflow.providers.mysql.operators.mysql import MySqlOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'start_date': datetime(2024, 1, 1),
}

dag = DAG(
    'mysql_access_dag',
    default_args=default_args,
    description='A DAG to demonstrate MySQL access in Airflow',
    schedule_interval=timedelta(days=1),
)

# Operator to execute MySQL query to read data
read_mysql_data = MySqlOperator(
    task_id='read_mysql_data',
    mysql_conn_id='mysql_default',
    sql='SELECT * FROM test1',
    dag=dag,
)

# Operator to execute MySQL query to write data
# write_mysql_data = MySqlOperator(
#     task_id='write_mysql_data',
#     mysql_conn_id='mysql_default',
#     sql='INSERT INTO destination_table SELECT * FROM source_table',
#     dag=dag,
# )

# Define task dependencies
# read_mysql_data >> write_mysql_data
read_mysql_data
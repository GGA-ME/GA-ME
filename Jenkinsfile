pipeline {
    agent none
    options { skipDefaultCheckout(false) }
    stages {
        stage('GitLab') {
           agent any
           steps {
               git branch: 'be/dev', credentialsId: '145eb9d6-4214-42f8-b81d-4ed730cce8f2',url: 'https://lab.ssafy.com/s10-bigdata-recom-sub2/S10P22E105'
           }
        }
        stage('build') {
            agent any
            steps {
                sh "pwd"
                sh "chmod +x ./backend/gradlew"
                sh "./backend/gradlew clean build"
            }
            post {
                success {
                    echo 'gradle build success'
                }

                failure {
                    echo 'gradle build failed'
                }
            }
        }
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t user-service:latest /jenkins'
            }
            post {
                success {
                    sh 'echo "Bulid Docker Image Success"'
                }

                failure {
                    sh 'echo "Bulid Docker Image Fail"'
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sh 'docker ps -f name=user-service -q \
                | xargs --no-run-if-empty docker container stop'

                sh 'docker container ls -a -f name=user-service -q \
        | xargs -r docker container rm'

                sh 'docker run -d --name user-service \
                -p 8000:8000 \
                -v /etc/localtime:/etc/localtime:ro \
                user-service:latest'
            }

            post {
                success {
                    echo 'success'
                }

                failure {
                    echo 'failed'
                }
            }
        }
    }
}

# Debian 기반 OpenJDK 이미지를 사용
FROM openjdk:17-bullseye

# 필요한 패키지 및 의존성 설치
RUN apt-get update && apt-get install -y wget unzip xvfb libxi6 libgconf-2-4

# Chrome 설치
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# ChromeDriver 설치
RUN CHROMEDRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) && \
    wget -N http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip -P ~/ && \
    unzip ~/chromedriver_linux64.zip -d ~/ && \
    rm ~/chromedriver_linux64.zip && \
    mv -f ~/chromedriver /usr/local/bin/chromedriver && \
    chown root:root /usr/local/bin/chromedriver && \
    chmod 0755 /usr/local/bin/chromedriver

# 애플리케이션 JAR 파일을 이미지에 추가
ARG JAR_FILE=build/libs/ggame-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} ggame-user.jar

# 애플리케이션 시작 명령어
ENTRYPOINT ["java","-jar","/ggame-user.jar"]

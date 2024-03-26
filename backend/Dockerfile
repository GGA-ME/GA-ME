# Debian 기반 OpenJDK 이미지를 사용
FROM openjdk:17-bullseye

# 필요한 패키지 설치 및 불필요한 리스트 파일 제거
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    xvfb \
    libxi6 \
    gdebi-core \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && gdebi --n google-chrome-stable_current_amd64.deb \
    && wget -N $(wget -qO- chromedriver.storage.googleapis.com/LATEST_RELEASE)/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin/ \
    && chmod 755 /usr/local/bin/chromedriver \
    && rm -rf /var/lib/apt/lists/* google-chrome-stable_current_amd64.deb chromedriver_linux64.zip

# 애플리케이션 JAR 파일을 이미지에 추가
ARG JAR_FILE=build/libs/ggame-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} ggame-user.jar

# 애플리케이션 시작 명령어
ENTRYPOINT ["java","-jar","/ggame-user.jar"]

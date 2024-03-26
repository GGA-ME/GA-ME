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
    && rm -rf /var/lib/apt/lists/* google-chrome-stable_current_amd64.deb

# ChromeDriver 설치
RUN CHROME_VERSION=$(google-chrome --version | grep -oE "[0-9.]*" | head -1) && \
    CHROME_MAJOR_VERSION=$(echo $CHROME_VERSION | cut -d'.' -f1) && \
    CHROMEDRIVER_VERSION=$(wget -qO- "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_MAJOR_VERSION") && \
    wget -N https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip -P /tmp/ && \
    unzip /tmp/chromedriver_linux64.zip -d /usr/local/bin/ && \
    chmod 755 /usr/local/bin/chromedriver && \
    rm /tmp/chromedriver_linux64.zip

# 애플리케이션 JAR 파일을 이미지에 추가
ARG JAR_FILE=build/libs/ggame-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} ggame-user.jar

# 애플리케이션 시작 명령어
ENTRYPOINT ["java","-jar","/ggame-user.jar"]

FROM openjdk:17
ARG JAR_FILE=build/libs/ggame-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} ggame-user.jar
ENTRYPOINT ["java","-jar","/ggame-user.jar"]
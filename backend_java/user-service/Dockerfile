# ===========================
#  Build stage (Java 25)
# ===========================
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -e -B dependency:go-offline

COPY src ./src
RUN mvn -q -e -B package -DskipTests

# ===========================
#  Run stage (Java 25)
# ===========================
FROM eclipse-temurin:25-jdk
WORKDIR /app

COPY --from=build /app/target/user-service-0.0.1-SNAPSHOT.jar app.jar

# ENV để Spring Boot đọc
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_NAME=userdb
ENV DB_USER=ducthuanle
ENV DB_PASSWORD=password_ducthuanle
ENV SERVER_PORT=8081

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

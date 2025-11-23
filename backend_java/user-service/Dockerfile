# ===========================
#  Build stage (Java 25)
# ===========================
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# context is root of project
#COPY ../pom.xml ./pom.xml
#COPY ../user-service/pom.xml ./user-service/pom.xml
# RUN mmvnnn -q -e -B dependency:go-offline
#COPY ../user-service/src ./user-service/src

#COPY src ./src -> only for context is user-service

# Copy toàn bộ project (parent + modules)
COPY .. .
#COPY . .

#RUN chmod +x mvnw
#RUN mvn -q -e -B package -DskipTests
# Build the entire project, Use the Maven Wrapper to compile, package, and install the project into the local repository, skipping the tests and minimizing the output log.
RUN ./mvnw -q -DskipTests install

# Debug: xem file JAR nằm ở đâu
#RUN ls -R /app

# ===========================
#  Run stage (Java 25)
# ===========================
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/user-service/target/user-service-1.0.0.jar app.jar

# ENV để Spring Boot đọc
ENV DB_HOST=user-db
ENV DB_PORT=5432
ENV DB_NAME=userdb
ENV DB_USER=ducthuanle
ENV DB_PASSWORD=password_ducthuanle
ENV SERVER_PORT=8081

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

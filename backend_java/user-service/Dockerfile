# ===========================
#  Build stage (Java 25)
# ===========================
FROM maven:3.9.6-eclipse-temurin-21 AS build
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
#RUN ./mvnw -q -DskipTests install

# Debug: xem file JAR nằm ở đâu
#RUN ls -R /app

# Copy parent pom + common + auth-service
#COPY ./pom.xml ./pom.xml
#COPY ./common/pom.xml ./common/pom.xml
#COPY ./common/src ./common/src
#COPY ./user-service/pom.xml ./user-service/pom.xml
#COPY ./user-service/src ./user-service/src

# Build riêng auth-service (Maven sẽ tự build cả common vì -am)
RUN mvn -q -e -B -pl user-service -am package -DskipTests

# ===========================
#  Run stage (Java 25)
# ===========================
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/user-service/target/user-service-1.0.0.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

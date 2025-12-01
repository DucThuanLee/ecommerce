# ==========================
# STAGE 1 — BUILD
# ==========================
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy parent pom
#COPY ./pom.xml ./pom.xml

# Copy common module
#COPY ./common/pom.xml ./common/pom.xml
#COPY ./common/src ./common/src

# Copy auth-service module
#COPY ./auth-service/pom.xml ./auth-service/pom.xml
#COPY ./auth-service/src ./auth-service/src

# Copy toàn bộ project (parent + modules)
COPY .. .

# Build module auth-service + modules it depends on (parent + common)
RUN mvn -q -e -B -pl auth-service -am package -DskipTests


# ==========================
# STAGE 2 — RUNTIME
# ==========================
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

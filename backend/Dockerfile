# syntax=docker/dockerfile:experimental

FROM openjdk:17-oracle as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN --mount=type=cache,target=/root/.m2 ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:17-oracle
WORKDIR /workspace/app
COPY --from=build /workspace/app/target/ .
RUN ls -lah
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
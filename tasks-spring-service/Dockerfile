# Start with a base image containing Java runtime
FROM adoptopenjdk:11-jdk-openj9
# Add the application's jar to the container
ADD target/tasks-spring-service.jar tasks-spring-service.jar
# Make port 8080 available to the world outside this container
EXPOSE 8080
# Run the jar file
ENTRYPOINT exec java $JAVA_OPTS -jar /tasks-spring-service.jar $SPRING_PROPERTIES
# Docker

To run the application inside docker containers run the following command:
```
DOCKER_BUILDKIT=1 docker-compose up --build
```

# No docker

To run each component on the host use the following commands:

## Spring Rest API

```
cd backend
RUN
```

## React front end

```
cd front
npm run start
```

## Postgres database

Start the docker container.

FROM ubuntu:22.04

RUN apt-get -y update && apt-get -y install build-essential curl iputils-ping

WORKDIR /app

COPY ./infrastructure/cockroach-db-migrator/entrypoint.sh ./
COPY ./db ./db
COPY ./makefile ./

CMD ["/bin/sh"]
ENTRYPOINT ["./entrypoint.sh"]

FROM cockroachdb/cockroach:latest-v21.2

EXPOSE 26257
EXPOSE 8080

COPY ./entrypoint.sh ./

CMD ["/bin/sh"]
ENTRYPOINT ["./entrypoint.sh"]

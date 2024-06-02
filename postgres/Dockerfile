FROM postgres:16

COPY setup.sql /docker-entrypoint-initdb.d/

COPY exportedData /docker-entrypoint-initdb.d/
COPY exportedUsers /docker-entrypoint-initdb.d/

EXPOSE 5432

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD pg_isready -U postgres -d drivingstatisticsdb || exit 1

FROM bitnami/prometheus:latest

USER root

RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

USER 1001

WORKDIR /app

EXPOSE 9090

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:9090/-/ready || exit 1

CMD ["--config.file=/etc/prometheus/prometheus.yml"]

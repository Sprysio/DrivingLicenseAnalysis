FROM grafana/grafana:latest

USER root

RUN apk update && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

USER 1001

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1


FROM dpage/pgadmin4:latest

USER root

RUN apk update && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

USER 1001

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1
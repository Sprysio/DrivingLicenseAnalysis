FROM node:14-alpine

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

HEALTHCHECK --interval=10s --timeout=30s \
     --retries=3 CMD curl -f http://localhost:8888/api/health || exit 1


CMD ["sh", "-c", "npm start"]
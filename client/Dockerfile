FROM node:14-alpine

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
     
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=30s \
     --retries=3 CMD curl -f http://localhost:3000|| exit 1


CMD ["sh", "-c", "npm start"]
FROM node:lts-alpine

EXPOSE 8080

RUN mkdir -p /usr/src/app/db \
   && addgroup -S tfm \
   && adduser -S -D -h /usr/src/app tfm tfm \
   && apk add --update --no-cache python3 make build-base git && ln -sf python3 /usr/bin/python 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R tfm:tfm /usr/src/app

USER tfm

CMD [ "npm", "run", "start" ]


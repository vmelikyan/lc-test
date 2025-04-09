FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN echo testasdasd
COPY . .

RUN sleep 30000
CMD [ "node", "app.js" ]


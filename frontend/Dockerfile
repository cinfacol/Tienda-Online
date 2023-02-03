# tienda-online/frontend/Dockerfile

FROM node:alpine3.17

WORKDIR /frontend

COPY package*.json .

ADD package.json /usr/src/app/package.json

RUN npm install

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN yarn build

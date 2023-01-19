# tienda-online/frontend/Dockerfile

FROM node:alpine3.17 AS builder

WORKDIR /opt/web

COPY package*.json .

ADD package.json /usr/src/app/package.json

RUN npm install

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN npm run build

# paso 2 CREATE NGINX SERVER

FROM nginx:1.23.3-alpine

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
  chmod +x envsubst && \
  mv envsubst /usr/local/bin

COPY ./nginx.config /etc/nginx/nginx.template

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

COPY --from=builder /opt/web/build /usr/share/nginx/html

FROM node:8

MAINTAINER Entria <hello@entria.com.br>

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN yarn install

COPY . /app

#cachable
RUN yarn build

CMD ["yarn", "start"]

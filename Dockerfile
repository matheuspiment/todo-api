FROM node:8.10-alpine

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean
COPY . /usr/src/app/
RUN cp .env.staging /usr/src/app/.env

CMD yarn run start

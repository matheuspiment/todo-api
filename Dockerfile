FROM node:8.10-alpine

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean
COPY . /usr/src/app/
RUN cp .env.production /usr/src/app/.env.production

CMD yarn run start

require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const Raven = require('./app/services/sentry');

const dbConfig = require('./config/database');

const app = new Koa();

mongoose.connect(dbConfig.uri);
requireDir(dbConfig.modelsPath);

app.use(koaBody());

const router = require('./app/router');

app.use(router.routes());

app.on('error', (err) => {
  Raven.captureException(err);
});

app.listen(3000);

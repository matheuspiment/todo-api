const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const dbConfig = require('./config/database');

const app = new Koa();

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

const router = require('./app/router');

app.use(koaBody());

app.use(router.routes());

app.listen(3000);

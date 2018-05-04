const Koa = require('koa');
const mongoose = require('mongoose');

const dbConfig = require('./config/database');

const app = new Koa();

mongoose.connect(dbConfig.url);

app.listen(3000);

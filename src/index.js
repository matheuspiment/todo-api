import 'babel-polyfill';
import Koa from 'koa';
import koaBody from 'koa-body';
import mongoose from 'mongoose';
import requireDir from 'require-dir';
import Raven from './app/services/sentry';

const envPath = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

require('dotenv').config({ path: envPath });

const dbConfig = require('./config/database');

const app = new Koa();

mongoose.connect(dbConfig.uri);
requireDir(dbConfig.modelsPath);

app.use(koaBody());

const router = require('./app/router');

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      return ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;

    switch (ctx.status) {
      case 404:
        ctx.body = { error: 'Not Found.' };
        break;

      default:
        ctx.body = { error: 'Internal server error.' };
        break;
    }

    ctx.app.emit('error', err, ctx);
  }
});

app.use(router.routes());

app.on('error', (err) => {
  Raven.captureException(err);
});

const server = app.listen(process.env.PORT || 3000);

module.exports = server;

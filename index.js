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

app.listen(process.env.PORT || 3000);

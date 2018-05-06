const Router = require('koa-router');
const requireDir = require('require-dir');

const router = new Router({ prefix: '/v1' });

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    throw err;
  }
});

/**
 * Auth
 */
router.post('/singup', controllers.authController.signup);
router.post('/singin', controllers.authController.singin);

/**
 * ===========
 * Auth routes
 */
router.use('/todo', authMiddleware);

router.get('/todo', (ctx) => {
  console.log(ctx.request.userId);
  ctx.body = 'OK';
});

module.exports = router;

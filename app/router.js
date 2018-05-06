const Router = require('koa-router');
const requireDir = require('require-dir');

const router = new Router({ prefix: '/v1' });

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: 'Internal server error.' };
    ctx.app.emit('error', err, ctx);
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
router.use(authMiddleware);

/**
 * ToDo
 */
router.post('/todos', controllers.toDoController.create);
router.delete('/todos/:id', controllers.toDoController.destroy);

/**
 * Users
 */
router.put('/users', controllers.userController.update);

module.exports = router;

const Router = require('koa-router');
const requireDir = require('require-dir');

const router = new Router({ prefix: '/v1' });

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Main
 */
router.get('/', (ctx) => {
  ctx.body = 'ToDo API v1';
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
router.put('/todos/:id', controllers.toDoController.toggle);

/**
 * Users
 */
router.get('/users/me', controllers.userController.me);
router.put('/users', controllers.userController.update);
router.get('/list', controllers.userController.list);

module.exports = router;

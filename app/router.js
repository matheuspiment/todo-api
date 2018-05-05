const Router = require('koa-router');
const requireDir = require('require-dir');

const router = new Router({ prefix: '/v1' });
const controllers = requireDir('./controllers');

/**
 * Auth
 */
router.post('/singup', controllers.authController.signup);

module.exports = router;

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { promisify } = require('util');

module.exports = async (ctx, next) => {
  const authHeader = ctx.request.headers.authorization;
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'No token provided.' };
    return ctx.body;
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    ctx.status = 401;
    ctx.body = { error: 'Token error.' };
    return ctx.body;
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    ctx.status = 401;
    ctx.body = { error: 'Token malformatted.' };
    return ctx.body;
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    ctx.request.userId = decoded.id;

    return next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Token invalid.' };
    return ctx.body;
  }
};

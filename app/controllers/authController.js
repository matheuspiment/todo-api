const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async singin(ctx, next) {
    try {
      const { email, password } = ctx.request.body;

      const user = await User.find444One({ email });

      if (!user) {
        ctx.status = 400;
        ctx.body = { error: 'User not found.' };
        return ctx.body;
      }

      if (!await user.compareHash(password)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid password.' };
        return ctx.body;
      }

      ctx.body = {
        user,
        token: user.generateToken(),
      };
      return ctx.body;
    } catch (err) {
      ctx.throw('500', err);
      return next();
    }
  },

  async signup(ctx, next) {
    try {
      const { email, username } = ctx.request.body;

      if (await User.findOne({ $or: [{ email }, { username }] })) {
        ctx.status = 400;
        ctx.body = { error: 'User already exists.' };
        return ctx.body;
      }

      const user = await User.create(ctx.request.body);
      ctx.body = {
        user,
        token: user.generateToken(),
      };

      return ctx.body;
    } catch (err) {
      ctx.throw('500', err);
      return next();
    }
  },
};

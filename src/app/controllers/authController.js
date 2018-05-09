const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async singin(ctx) {
    try {
      const { email, password } = ctx.request.body;

      const user = await User.findOne({ email });

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
      return ctx.throw(500, err);
    }
  },

  async signup(ctx) {
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
      return ctx.throw(500, err);
    }
  },
};

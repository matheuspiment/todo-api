const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signup(ctx, next) {
    try {
      const { email, username } = ctx.request.body;

      if (await User.findOne({ $or: [{ email }, { username }] })) {
        ctx.status = 400;
        ctx.body = { error: 'User already exists.' };
      }

      const user = await User.create(ctx.request.body);
      ctx.body = user;

      return ctx.body;
    } catch (err) {
      return next(err);
    }
  },
};

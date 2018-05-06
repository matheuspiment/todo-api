const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async me(ctx) {
    try {
      const user = await User.findById(ctx.request.userId);

      ctx.body = user;

      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      const id = ctx.request.userId;

      const {
        name,
        username,
        password,
        confirmPassword,
      } = ctx.request.body;

      if (password && password !== confirmPassword) {
        ctx.status = 400;
        ctx.body = { error: 'Password does not match.' };
        return ctx.body;
      }

      const user = await User.findByIdAndUpdate(id, { name, username }, { new: true });

      if (password) {
        user.password = password;
        await user.save();
      }

      ctx.body = user;

      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },
};

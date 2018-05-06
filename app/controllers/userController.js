const mongoose = require('mongoose');

const User = mongoose.model('User');
const ToDo = mongoose.model('ToDo');

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

  async list(ctx) {
    try {
      const user = await User.findById(ctx.request.userId);

      const toDoList = await ToDo
        .find({
          user: { $in: [user.id] },
        })
        .sort('-createdAt');

      ctx.body = toDoList;

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

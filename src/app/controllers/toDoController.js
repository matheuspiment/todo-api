const mongoose = require('mongoose');

const ToDo = mongoose.model('ToDo');

module.exports = {
  async create(ctx) {
    try {
      const toDo = await ToDo.create({
        ...ctx.request.body,
        user: ctx.request.userId,
      });

      ctx.body = toDo;
      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },

  async destroy(ctx) {
    try {
      await ToDo.findOneAndRemove({ _id: ctx.params.id });

      ctx.body = '';

      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },

  async toggle(ctx) {
    try {
      const toDo = await ToDo.findById(ctx.params.id);

      if (!toDo) {
        ctx.status = 400;
        ctx.body = { error: 'ToDo does not exist.' };
        return ctx.body;
      }

      if (ctx.request.userId !== toDo.user) {
        ctx.status = 401;
        ctx.body = { error: 'This todo is not yours.' };
        return ctx.body;
      }

      toDo.status = !toDo.status;
      await toDo.save();

      ctx.body = toDo;
      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },
};

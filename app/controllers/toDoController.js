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
      await ToDo.findOneAndRemove(ctx.params.id);

      ctx.body = '';

      return ctx.body;
    } catch (err) {
      return ctx.throw(500, err);
    }
  },
};

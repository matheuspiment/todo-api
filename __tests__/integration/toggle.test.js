const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');

const User = mongoose.model('User');
const ToDo = mongoose.model('ToDo');

describe('Toogle', () => {
  beforeEach(async () => {
    await User.remove();
    await ToDo.remove();
  });

  it('it should not be able to toggle a todo by another user', async () => {
    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const todo = await factory.create('ToDo', {
      user: user.id,
    });

    const response = await chai.request(app)
      .put(`/v1/todos/${todo.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('error');
  });
});

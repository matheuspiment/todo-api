const path = require('path');

module.exports = {
  url: process.env.DATABASE_URL,
  modelsPath: path.resolve('app', 'models'),
};

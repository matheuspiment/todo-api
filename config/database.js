const path = require('path');

module.exports = {
  url: process.env.DATABASE_URI,
  modelsPath: path.resolve('app', 'models'),
};

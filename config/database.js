const path = require('path');

module.exports = {
  uri: process.env.DATABASE_URI,
  modelsPath: path.resolve('app', 'models'),
};

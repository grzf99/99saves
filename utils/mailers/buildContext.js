const { APP_URL } = require('../../config');

const defaultContext = {
  appUrl: APP_URL
};

module.exports = context => Object.assign({}, defaultContext, context);

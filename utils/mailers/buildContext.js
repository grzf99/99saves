const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

const defaultContext = {
  appUrl: APP_URL
};

module.exports = context => Object.assign({}, defaultContext, context);

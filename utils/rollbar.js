const Rollbar = require('rollbar');

export default new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN);

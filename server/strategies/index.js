const createJwtStrategy = require('./jwt');

module.exports = {
  'client-jwt': createJwtStrategy(),
  'admin-jwt': createJwtStrategy({ adminAuthentication: true })
};

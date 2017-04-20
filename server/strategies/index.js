const facebook = require('./facebook');
const createJwtStrategy = require('./jwt');

module.exports = {
  'facebook-token': facebook,
  'client-jwt': createJwtStrategy(),
  'admin-jwt': createJwtStrategy({ adminAuthentication: true })
};

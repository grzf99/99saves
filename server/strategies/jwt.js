const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

module.exports = ({ adminAuthentication = false } = {}) => {
  return new Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    ignoreExpiration: true,
  }, (payload, cb) => {
    if (payload !== undefined) {
      if (adminAuthentication) {
        cb(null, payload.admin ? payload : false);
      } else {
        cb(null, payload);
      }
    } else {
      cb(null, false);
    }
  })
};

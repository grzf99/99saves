const Strategy = require('passport-facebook-token');
const User = require('../models').User;

module.exports = new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
},
(accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({
    where: { facebookId: profile.id },
    defaults: { name: profile.displayName, email: profile.emails[0].value }
  })
  .spread((user) => {
    cb(null, user.get({
      plain: true
    }));
  });
});

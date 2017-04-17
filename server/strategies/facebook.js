const Strategy = require('passport-facebook-token');
const usersController = require('../controllers').users;

module.exports = new Strategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET
},
(accessToken, refreshToken, profile, cb) => {
  usersController.findOrCreate(accessToken, profile)
    .then((user) => {
      cb(null, user);
    });
});

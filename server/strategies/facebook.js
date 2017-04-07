const Strategy = require('passport-facebook-token');
const usersController = require('../controllers').users;

module.exports = new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
},
(accessToken, refreshToken, profile, cb) => {
  usersController.findOrCreate(accessToken, profile)
    .then((user) => {
      cb(null, user);
    });
});

const passport = require('passport');

module.exports = {
  clientAuthentication(optional = false) {
    return (req, res, next) => {
      passport.authenticate('client-jwt', (err, user) => {
        if (err) {
          next(err);
        }
        if (user) {
          req.user = user;
          return next();
        }

        if (optional) {
          return next();
        }

        res.sendStatus(401);
      })(req, res, next);
    };
  },
  adminAuthentication() {
    return passport.authenticate('admin-jwt');
  }
};

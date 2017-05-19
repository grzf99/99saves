const { User, Profile } = require('../models');
const { generateToken } = require('../../utils/jwt');

module.exports = {
  clientLogin(req, res) {
    return login(req, res);
  },

  adminLogin(req, res) {
    return login(req, res, true);
  }
};

function login(req, res, adminAuthentication = false) {
  const { email, password } = req.body;
  return User.findOne({
    where: {
      email,
      admin: adminAuthentication
    },
    include: [Profile]
  })
    .then((user) => {
      if (user !== null) {
        return user.authenticate(password);
      }
    })
    .then((user) => {
      if (user !== undefined && user.isAuthenticated) {
        const token = generateToken(user);
        res.json(Object.assign({}, user, { token }));
      } else {
        res.sendStatus(422);
      }
    });
}

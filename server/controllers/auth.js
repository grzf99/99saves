const { User } = require('../models');
const { generateToken } = require('../../utils/jwt');

module.exports = {
  login(req, res) {
    const { email, password } = req.body
    return User.findOne({ where: { email } })
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
      })
  },
  facebook (req, res) {
    if (req.user) {
      res.status(200).send({
        user: req.user,
      });
    } else {
      res.sendStatus(401);
    }
  }
};

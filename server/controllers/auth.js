const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../../utils/jwt');

module.exports = {
  login(req, res) {
    const { email, password } = req.body
    return User.findOne({ where: { email } })
      .then((user) => {
        if (user !== null) {
          return Promise.all([
            user,
            bcrypt.compare(password, user.passwordHash)
          ]);
        }
      })
      .then((response) => {
        if (response !== undefined) {
          const [user, isValid] = response;
          if (isValid) {
            const token = generateToken(user);
            res.json(Object.assign({}, user.toJSON(), { token }));
          } else {
            res.sendStatus(422);
          }
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

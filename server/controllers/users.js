const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../../utils/jwt');

module.exports = {
  list(req, res) {
    return User
      .findAndCountAll({
        order: [
          ['createdAt', 'DESC']
        ],
        offset: req.query.offset,
        limit: req.query.limit
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  create (req, res) {
    const { user } = req.body;

    // bcrypt can't be a promise
    // because it can't chain with sequelize's `.spread`
    // or this would happen: bcrypt.hash(...).then(...).spread is not a function
    return new Promise((resolve) => {
      bcrypt.hash(user.password, 10, (err, passwordHash) => {
        User.findOrCreate({
          where: { email: user.email },
          defaults: Object.assign({}, user, { passwordHash })
        })
        .spread((user, created) => {
          if (created) {
            const token = generateToken(user);
            res.status(201).json(Object.assign({}, user.toJSON(), { token }));
          } else {
            res.sendStatus(422);
          }
          resolve();
        });
      });
    });
  },

  findOrCreate(accessToken, profile) {
    return new Promise((resolve) => {
      User.findOrCreate({
        where: { facebookId: profile.id },
        defaults: { name: profile.displayName, email: profile.emails[0].value }
      })
      .spread((user) => {
        resolve(user.get({
          plain: true
        }));
      });
    });
  }
};

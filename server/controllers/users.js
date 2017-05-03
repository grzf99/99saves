const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../../utils/jwt');

module.exports = {
  list(req, res) {
    return User.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: req.query.offset,
      limit: req.query.limit
    })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { user } = req.body;
    return User.findOrCreate({
      where: { email: user.email },
      defaults: Object.assign({}, user, { admin: false })
    }).spread((user, created) => {
      if (created) {
        const token = generateToken(user.toJSON());
        res.status(201).json(Object.assign({}, user.toJSON(), { token }));
      } else {
        res.sendStatus(422);
      }
    });
  },

  // TODO: since admin is only being set on update
  // remove this and unify to create users in just one method to avoid duplication
  createAdmin(req, res) {
    let user = req.body;
    return User.findOrCreate({
      where: { email: user.email },
      defaults: Object.assign({}, user, { admin: false })
    }).spread((user, created) => {
      if (created) {
        res.sendStatus(201);
      } else {
        res.sendStatus(422);
      }
    });
  },

  update(req, res) {
    let user = req.body;
    if (user.password) {
      // TODO: move this encryption to User model
      return bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
        User.update(user, {
          where: { id: req.params.id }
        })
          .then(re => res.status(200).send(re))
          .catch(error => res.status(400).send(error));
      });
    }
    return User.update(req.body, {
      where: { id: req.params.id }
    })
      .then(re => res.status(200).send(re))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return User.findById(req.params.id)
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  isAvailable(req, res) {
    return User.find({
      where: {
        email: req.query.email
      }
    })
      .then(user =>
        res.status(200).json({
          isAvailable: user === null
        })
      )
      .catch(error => res.status(500).send(error));
  },

  // TODO: deprecate
  findOrCreate(accessToken, profile) {
    return new Promise((resolve) => {
      User.findOrCreate({
        where: { facebookId: profile.id },
        defaults: { name: profile.displayName, email: profile.emails[0].value }
      }).spread((user) => {
        resolve(
          user.get({
            plain: true
          })
        );
      });
    });
  }
};

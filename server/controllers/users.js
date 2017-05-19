const bcrypt = require('bcrypt');
const { User, Profile } = require('../models');
const { generateToken } = require('../../utils/jwt');
const SignupWelcomeMailer = require('../mailers/signup-welcome');

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

  async create(req, res) {
    const params = req.body.user;
    let user = await User.find({ where: { email: params.email } });
    if (user !== null) {
      return res.sendStatus(422);
    }

    user = await User.create(Object.assign({}, params, { admin: false }));
    const profile = await Profile.create(
      Object.assign({}, params.profile, { UserId: user.id })
    );

    SignupWelcomeMailer.mail(user.email, { user, profile });

    const token = generateToken(user.toJSON());
    return res
      .status(201)
      .json(Object.assign({}, user.toJSON(), { token, profile }));
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
  }
};

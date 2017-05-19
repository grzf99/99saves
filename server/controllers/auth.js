const crypto = require('crypto');
const ms = require('ms');
const { User, Profile } = require('../models');
const { generateToken } = require('../../utils/jwt');
const ForgotPasswordMailer = require('../mailers/forgot-password');

module.exports = {
  clientLogin(req, res) {
    return login(req, res);
  },

  adminLogin(req, res) {
    return login(req, res, true);
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      await User.update(
        {
          resetPasswordToken: crypto.randomBytes(64).toString('hex'),
          resetPasswordTokenExpires: ms('2 days')
        },
        {
          where: { email },
          individualHooks: true,
          returning: true
        }
      );
      const user = await User.find({ where: { email } });
      ForgotPasswordMailer.mail(user);

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
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

const crypto = require('crypto');
const ms = require('ms');
const { isAfter, addMilliseconds } = require('date-fns');
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
          resetPasswordTokenExpires: addMilliseconds(
            new Date(),
            ms('2 days')
          ).toISOString()
        },
        {
          where: { email },
          individualHooks: true
        }
      );
      const user = await User.find({ where: { email } });
      ForgotPasswordMailer.mail(user);

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    const now = new Date();
    const user = await User.find({ where: { resetPasswordToken: token } });

    if (
      user === null ||
      (user !== null && isAfter(now, new Date(user.resetPasswordTokenExpires)))
    ) {
      return res.status(422).send('Token is invalid');
    }

    try {
      await User.update(
        { password, resetPasswordToken: null, resetPasswordTokenExpires: null },
        { where: { resetPasswordToken: token }, individualHooks: true }
      );
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};

function login(req, res, adminAuthentication = false, providerAuthentication = false) {
  const { email, password } = req.body;

  return User.findOne({
    where: {
      email,
      admin: adminAuthentication,
      ProviderId: providerAuthentication ? {$not: null} : null,
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

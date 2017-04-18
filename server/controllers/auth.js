const { User } = require('../models');

module.exports = {
  login(req, res) {

  },

  logout(req, res) {

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

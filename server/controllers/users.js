const User = require('../models').User;

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

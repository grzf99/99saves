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
  }
};

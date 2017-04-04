const Users = require('../models').User;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  }
};

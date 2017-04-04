const Save = require('../models').Save;

module.exports = {
  list(req, res) {
    return Save
      .findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(saves => res.status(200).send(saves))
      .catch(error => res.status(400).send(error));
  }
};

const Save = require('../models').Save;

module.exports = {
  create(req, res) {
    return Save
      .create(req.body)
      .then(saves => res.status(201).send(saves))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Save
      .findAndCountAll({
        order: [
          ['date_end', 'ASC']
        ],
        offset: req.query.offset,
        limit: req.query.limit
      })
      .then(saves => res.status(200).send(saves))
      .catch(error => res.status(400).send(error));
  }
};

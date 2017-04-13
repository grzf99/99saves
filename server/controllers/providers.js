const Provider = require('../models').Provider;

module.exports = {
  show(req, res) {
    return Provider
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Provider
      .create(req.body)
      .then(provider => res.status(201).send(provider))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Provider
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(provider => res.status(200).send(provider))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Provider
      .findAndCountAll({
        order: [
          ['id', 'DESC']
        ],
        offset: req.query.offset,
        limit: req.query.limit
      })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    Provider.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
  }
};

const { Product, Provider, Save } = require('../models');

module.exports = {
  list(req, res) {
    return Product
      .findAndCountAll({
        include: [
          { model: Save },
          { model: Provider }
        ],
        order: [
          ['id', 'DESC']
        ],
        offset: req.query.offset,
        limit: req.query.limit
      })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Product
      .create(req.body)
      .then(resp => res.status(201).send(resp))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Product
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(product => res.status(200).send(product))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedRecords => res.status(200).json(deletedRecords))
    .catch(error => res.status(500).json(error));
  }
};

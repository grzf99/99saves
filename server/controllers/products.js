const { Product, Provider, Save } = require('../models');

module.exports = {
  show(req, res) {
    return Product
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

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
    const product = Object.assign({ date_buscape: new Date() }, req.body);
    return Product
      .create(product)
      .then(resp => res.status(201).send(resp))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const product = Object.assign({ date_buscape: new Date() }, req.body);
    return Product
      .update(product, {
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

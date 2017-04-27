const { Product, Provider, Save, Coupon, Subscription } = require('../models');

module.exports = {
  show(req, res) {
    return Product.find({
      where: {
        id: req.params.id
      }
    })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Product.findAndCountAll({
      include: [{ model: Save }, { model: Provider }, { model: Coupon }],
      order: [['id', 'DESC']],
      offset: req.query.offset,
      limit: req.query.limit
    })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const product = Object.assign({ date_buscape: new Date() }, req.body);
    return (
      Product.create(product, { include: [Coupon] })
        // sequelize don't support assiciation hooks
        // so it had to be implemented as a method
        .then(prod => prod.mapCouponsToSubscriptions())
        .then(() => res.sendStatus(201))
        .catch(error => res.status(400).send(error))
    );
  },

  update(req, res) {
    const product = Object.assign({ date_buscape: new Date() }, req.body);
    return Product.update(product, {
      where: {
        id: req.params.id
      }
    })
      .then(prod => res.status(200).send(prod))
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

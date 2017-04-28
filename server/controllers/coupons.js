const { Coupon, Subscription, User, Save, Product } = require('../models');

module.exports = {
  list(req, res) {
    return Coupon.findAndCountAll({
      include: [
        { model: Product },
        {
          model: Subscription,
          include: [User, Save],
          where: { CouponId: { $not: null } }
        }
      ],
      order: [['id', 'DESC']]
    })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(500).send(error));
  },
  update(req, res) {
    return Coupon.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(coupon => res.status(200).send(coupon))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Coupon.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => res.sendStatus(200))
      .catch(error => res.status(500).json(error));
  }
};

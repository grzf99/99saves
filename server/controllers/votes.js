const { Subscription, Vote } = require('../models');

module.exports = {
  show(req, res) {
    return Subscription.findOne({
      where: {
        SaveId: req.params.saveId,
        UserId: req.user ? req.user.id : 1 // TODO: remover esse mock quando a auth estiver OK
      }
    })
    .then((subscription) => {
      if (subscription === null) return;
      return Vote.findOne({
        where: {
          SubscriptionId: parseInt(subscription.id, 10)
        }
      });
    })
    .then(save => res.status(200).send(save))
    .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Subscription.findOne({
      where: {
        SaveId: req.params.saveId,
        UserId: req.user ? req.user.id : 1 // TODO: remover esse mock quando a auth estiver OK
      }
    })
    .then(subscription => Vote.create({
      SubscriptionId: parseInt(subscription.id, 10),
      ProductId: req.body.ProductId
    }))
    .then(vote => res.status(201).send(vote))
    .catch(error => res.status(400).send(error));
  }
};

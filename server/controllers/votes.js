const Vote = require('../models').Vote;
const Subscription = require('../models').Subscription;

module.exports = {
  create(req, res) {
    return Subscription.findOne({
      where: {
        SaveId: req.params.saveId,
        UserId: req.user.id
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

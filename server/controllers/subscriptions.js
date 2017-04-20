const { Subscription } = require('../models');

module.exports = {
  create(req, res) {
    return Subscription
      .create({
        SaveId: parseInt(req.params.saveId, 10),
        UserId: req.user.id
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  }
};

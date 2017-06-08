const { Subscription } = require('../models');
const ParticipationStartMailer = require('../mailers/participation-start');

module.exports = {
  create(req, res) {
    return Subscription.create({
      SaveId: parseInt(req.params.saveId, 10),
      UserId: req.user.id
    })
      .then(subscription => {

        ParticipationStartMailer.mail(req.user.email, { user, subscription });

        res.status(201).send(subscription)
      })
      .catch(error => res.status(400).send(error));
  },

  async update(req, res) {
    const { rate } = req.body;
    const { id } = req.params;
    try {
      const { UserId } = await Subscription.findById(id);
      if (req.user.id !== UserId) {
        return res.sendStatus(401);
      }

      const subscription = await Subscription.update(
        { rate },
        { where: { id } }
      );
      return res.status(200).json(subscription);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

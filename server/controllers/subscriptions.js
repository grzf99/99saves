const { Save, Cicle, Subscription } = require('../models');
const ParticipationStartMailer = require('../mailers/participation-start');

module.exports = {
  async create(req, res) {
    try {
      const subscription = await Subscription.create({
        CicleId: parseInt(req.params.cicleId, 10),
        UserId: req.user.id
      });

      const cicle = await Cicle.findById(subscription.CicleId);

      ParticipationStartMailer.mail(req.user.email, { user: req.user, cicle });

      return res.status(201).send(subscription);
    } catch (err) {
      return res.status(400).send(error);
    }
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

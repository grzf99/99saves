const { Category, Cicle, Save, Product, Vote, Provider } = require('../models');

module.exports = {
  async verify() {
    const cicles = await Cicle.scope('lastChance').findAll({
      include: [{model: Save}, { model: Product, required: true, include: [Vote, Provider] }]
    });
    return cicles.map(cicle =>
      global.queue.create('last-chance', { cicle }).removeOnComplete(true).save()
    );
  }
};

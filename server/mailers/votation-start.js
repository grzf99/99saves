const { Save, Product, Provider } = require('../models');
const queue = require('../delayed-jobs');

module.exports = {
  async verify() {
    const saves = await Save.scope('votable').findAll({
      include: [{ model: Product, include: [Provider] }]
    });
    return saves.map(save =>
      queue.create('votation-start', { save }).removeOnComplete(true).save()
    );
  }
};

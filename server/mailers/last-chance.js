const { Save, Product, Provider } = require('../models');
const queue = require('../delayed-jobs');

module.exports = {
  async verify() {
    const saves = await Save.scope('lastChance').findAll({
      include: [{ model: Product, include: [Provider] }]
    });
    return saves.map(save =>
      queue.create('last-chance', { save }).removeOnComplete(true).save()
    );
  }
};

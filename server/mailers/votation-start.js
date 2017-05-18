const { Save, Product, Provider } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('votable').findAll({
      include: [{ model: Product, include: [Provider] }]
    });
    return saves.map(save =>
      global.queue
        .create('votation-start', { save })
        .removeOnComplete(true)
        .save()
    );
  }
};

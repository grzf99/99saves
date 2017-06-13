const { Save, Product, Provider } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('startedCheckoutToday').findAll({
      include: [{ model: Product, required: true, include: [Provider] }]
    });
    return saves.map(save =>
      global.queue
        .create('checkout-start', { save })
        .removeOnComplete(true)
        .save()
    );
  }
};

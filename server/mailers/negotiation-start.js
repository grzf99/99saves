const { Save } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('negotiationStartToday').findAll();
    return saves.map(save =>
      global.queue
        .create('negotiation-start', { save })
        .removeOnComplete(true)
        .save()
    );
  }
};

const { Save, Cicle } = require('../models');

module.exports = {
  async verify() {
    const cicles = await Cicle.scope('negotiationStartToday').findAll();
    return cicles.map(cicle =>
      global.queue
        .create('negotiation-start', { cicle })
        .removeOnComplete(true)
        .save()
    );
  }
};

const { Save, Product, Vote, Provider } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('feedbackable').findAll({
      include: [{ model: Product, required: true, include: [Vote, Provider] }]
    });
    return saves.map(save =>
      global.queue.create('feedback', { save }).removeOnComplete(true).save()
    );
  }
};

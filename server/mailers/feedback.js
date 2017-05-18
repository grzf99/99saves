const { Save, Product } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('feedbackable').findAll({
      include: [Product]
    });
    return saves.map(save =>
      global.queue.create('feedback', { save }).removeOnComplete(true).save()
    );
  }
};

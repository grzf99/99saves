const { Save, Product } = require('../models');
const queue = require('../delayed-jobs');

module.exports = {
  async verify() {
    const saves = await Save.scope('feedbackable').findAll({
      include: [Product]
    });
    return saves.map(save => queue.create('feedback', { save }).save());
  }
};

const { Save, Product, Provider } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('votable').findAll({
      include: [{ model: Product, required: true, include: [Provider] }]
    });
    return saves.map(save => {
        // Check if save has more than 1 product (saves with only one product must go direct to checkout)
        if (save.Products.length > 1)
          global.queue
            .create('votation-start', { save })
            .removeOnComplete(true)
            .save()
        // if save has only one product it can enter directly to checkout
        else if (save.Products.length == 1)
          global.queue
            .create('checkout-start', { save })
            .removeOnComplete(true)
            .save()
      }
    );
  }
};

const { Category, Cicle, Save, Product, Provider } = require('../models');

module.exports = {
  async verify() {
    const cicles = await Cicle.scope('votable').findAll({
      include: [{model: Save}, { model: Product, required: true, include: [Provider] }]
    });
    return cicles.map(cicle => {
        // Check if save has more than 1 product (saves with only one product must go direct to checkout)
        if (cicle.Products.length > 1)
          global.queue
            .create('votation-start', { cicle })
            .removeOnComplete(true)
            .save()
        // if save has only one product it can enter directly to checkout
        else if (cicle.Products.length == 1)
          global.queue
            .create('checkout-start', { cicle })
            .removeOnComplete(true)
            .save()
      }
    );
  }
};

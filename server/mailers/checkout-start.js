const { Save, Product, Provider } = require('../models');

module.exports = {
  async verify() {
    const saves = await Save.scope('startedCheckoutToday').findAll({
      include: [{ model: Product, required: true, include: [Provider] }]
    });
    return saves.map(save => {
        // Check if save has more than 1 product (saves with only one product must go direct to checkout) so send the checkout start email
        // if it has only one product the votable mailer will be responsible for send then, and must be sent one day before
        if (save.Products.length > 1)
          global.queue
            .create('checkout-start', { save })
            .removeOnComplete(true)
            .save()
      }
    );
  }
};

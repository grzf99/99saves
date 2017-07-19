const { Category, Cicle, Save, Product, Provider, Vote } = require('../models');

module.exports = {
  async verify() {
    const cicles = await Cicle.scope('startedCheckoutToday').findAll({
      include: [{model: Save}, { model: Product, required: true, include: [Vote, Provider] }]
    });
    return cicles.map(cicle => {
        // Check if save has more than 1 product (saves with only one product must go direct to checkout) so send the checkout start email
        // if it has only one product the votable mailer will be responsible for send then, and must be sent one day before
        if (cicle.Products.length > 1)
          global.queue
            .create('checkout-start', { cicle })
            .removeOnComplete(true)
            .save()
      }
    );
  }
};

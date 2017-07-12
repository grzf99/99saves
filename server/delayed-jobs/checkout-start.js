const { format, addHours } = require('date-fns');
const { User, Subscription, Product, Provider } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { CicleId: id },
    include: [User]
  });
}

function getWinnerProductDetails(id) {
  return Product.findById(id, { include: [Provider] });
}

module.exports = async (job, done) => {
  const { cicle } = job.data;
  const subscriptions = await getSaveSubscriptions(cicle.id);
  const product = await getWinnerProductDetails(cicle.winnerProduct.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running checkout start job for save cicle ${cicle.id} - ${cicle.Save.title} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `O melhor preço de ${cicle.Save.title} chegou. Compre até ${format(addHours(cicle.checkout_end, -3), 'DD/MM')}!`,
            to: s.User.email,
            template: 'mailers/checkout-start.hbs',
            context: { cicle, product }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

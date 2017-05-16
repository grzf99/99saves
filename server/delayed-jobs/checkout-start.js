const { format } = require('date-fns');
const { User, Subscription, Product, Provider } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { SaveId: id },
    include: [User]
  });
}

function getWinnerProductDetails(id) {
  return Product.findById(id, { include: [Provider] });
}

module.exports = async (job, done) => {
  const queue = require('./index');
  const { save } = job.data;
  const subscriptions = await getSaveSubscriptions(save.id);
  const product = await getWinnerProductDetails(save.winnerProduct.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running checkout start job for save ${save.id} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return queue
          .create('email', {
            subject: `O melhor preço de ${save.title} chegou. Compre até ${(format(save.checkout_end), 'DD/MM')}!`,
            to: s.User.email,
            template: 'mailers/checkout-start.hbs',
            context: { save, product }
          })
          .save();
      }
    })
  ).then(() => done());
};

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
  const queue = require('./index');
  const { cicle } = job.data;
  const subscriptions = await getSaveSubscriptions(cicle.id);
  const product = await getWinnerProductDetails(cicle.winnerProduct.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running feedback job for save cicle ${save.id} - ${cicle.Save.title} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `Como foi a compra de ${cicle.Save.title}?`,
            to: s.User.email,
            template: 'mailers/feedback.hbs',
            context: { cicle, product }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

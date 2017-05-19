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
    `running feedback job for save ${save.id} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `Como foi a compra de ${save.title}?`,
            to: s.User.email,
            template: 'mailers/feedback.hbs',
            context: { save, product }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

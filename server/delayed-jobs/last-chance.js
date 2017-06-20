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
    `running last chance start job for save ${save.id} - ${save.title} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: 'O seu tempo tá acabando. Corra.',
            to: s.User.email,
            template: 'mailers/last-chance.hbs',
            context: { save, product }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

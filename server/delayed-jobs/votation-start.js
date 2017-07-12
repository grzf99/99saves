const { User, Subscription } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { CicleId: id },
    include: [User]
  });
}

module.exports = async (job, done) => {
  const queue = require('./index');
  const { cicle } = job.data;
  const subscriptions = await getSaveSubscriptions(cicle.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running votation start job for save cicle ${cicle.id} - ${cicle.Save.title} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `Vote agora na melhor oferta de ${cicle.Save.title}.`,
            to: s.User.email,
            template: 'mailers/votation-start.hbs',
            context: { cicle }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

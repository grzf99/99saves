const { User, Subscription } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { SaveId: id },
    include: [User]
  });
}

module.exports = async (job, done) => {
  const queue = require('./index');
  const { save } = job.data;
  const subscriptions = await getSaveSubscriptions(save.id);

  if (subscriptions.length === 0) {
    return done();
  }

  return Promise.all(
    subscriptions.map(s =>
      queue
        .create('email', {
          subject: `Vote agora na melhor oferta de ${save.title}.`,
          to: s.User.email,
          template: 'mailers/votation-start.hbs',
          context: { save }
        })
        .save()
    )
  ).then(() => done());
};

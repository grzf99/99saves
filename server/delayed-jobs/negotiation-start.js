const { format } = require('date-fns');
const { User, Subscription } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { CicleId: id },
    include: [User]
  });
}

module.exports = async (job, done) => {
  const { cicle } = job.data;
  const subscriptions = await getSaveSubscriptions(cicle.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running negotiation start job for save cicle ${cicle.id} - ${cicle.Save.title} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `O save ${cicle.Save.title} está encerrado. Em breve você receberá as melhores ofertas!`,
            to: s.User.email,
            template: 'mailers/negotiation-start.hbs',
            context: { cicle }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

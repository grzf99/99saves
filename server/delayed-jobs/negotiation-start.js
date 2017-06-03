const { format } = require('date-fns');
const { User, Subscription } = require('../models');

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: { SaveId: id },
    include: [User]
  });
}

module.exports = async (job, done) => {
  const { save } = job.data;
  const subscriptions = await getSaveSubscriptions(save.id);

  if (subscriptions.length === 0) {
    return done();
  }
  console.log(
    `running negotiation start job for save ${save.id} with ${subscriptions.length} subscriptions`
  );

  return Promise.all(
    subscriptions.map((s) => {
      if (s.User && s.User.email) {
        return global.queue
          .create('email', {
            subject: `O save ${save.title} está encerrado. Em breve você receberá as melhores ofertas!`,
            to: s.User.email,
            template: 'mailers/negotiation-start.hbs',
            context: { save }
          })
          .removeOnComplete(true)
          .save();
      }
    })
  ).then(() => done());
};

const schedule = require('node-schedule');
const { addMinutes } = require('date-fns');
const { compileTemplate, sendMail } = require('../../utils/mailers');
const { Subscription, User, Save, Product, Provider } = require('../models');

function getSaveDetails(id) {
  return Save.findById(id, {
    include: [
      {
        model: Product,
        include: [Provider]
      }
    ]
  });
}

function getSaveSubscriptions(id) {
  return Subscription.findAll({
    where: {
      SaveId: id,
      include: [User]
    }
  });
}

module.exports = {
  schedule(save) {
    return schedule.scheduleJob(
      addMinutes(new Date(), 10),
      // addMinutes(save.negotiation_end, 1),
      this.mail.bind(this, save)
    );
  },
  async mail({ id }) {
    const save = await getSaveDetails(id);
    const content = await compileTemplate('mailers/votation-start.hbs', {
      save
    });
    const subscriptions = await getSaveSubscriptions(id);

    return Promise.all(
      subscriptions.map(s =>
        sendMail(
          `Vote agora na melhor oferta de ${save.title}.`,
          s.User.email,
          content
        )
      )
    );
  }
};

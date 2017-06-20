const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');
const NegotiationStartMailer = require('./mailers/negotiation-start');

module.exports = () => {
  console.log('schedule run');
  // TODO: Disabilitando envio de emails até conclusão dos testes
  schedule.scheduleJob('40 22 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
    NegotiationStartMailer.verify();
  });
};

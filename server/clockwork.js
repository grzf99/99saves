const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');
const NegotiationStartMailer = require('./mailers/negotiation-start');

module.exports = () => {
  console.log('schedule run');
  // REMEMBER: Server hour is -0 GMT (is 3 hours greater than brazil, consider the difference)
  // Running at 18:35
  schedule.scheduleJob('35 18 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
    NegotiationStartMailer.verify();
  });
};

const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');
const NegotiationStartMailer = require('./mailers/negotiation-start');

module.exports = () => {
  console.log('schedule run');
  // REMEMBER: Server hour is -0 GMT (is 3 hours greater than brazil, consider the difference)
  // Running at 20:00
  schedule.scheduleJob('0 23 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
    NegotiationStartMailer.verify();
  });
};

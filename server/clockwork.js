const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');
const NegotiationStartMailer = require('./mailers/negotiation-start');

module.exports = () => {
  schedule.scheduleJob('40 20 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
    NegotiationStartMailer.verify();
  });
};

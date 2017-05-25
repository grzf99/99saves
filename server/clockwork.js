const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');

module.exports = () => {
  schedule.scheduleJob('1 18 * * *', () => {
    VotationStartMailer.verify();
  });
  schedule.scheduleJob('2 18 * * *', () => {
    CheckoutStartMailer.verify();
  });
  schedule.scheduleJob('3 18 * * *', () => {
    LastChanceMailer.verify();
  });
  schedule.scheduleJob('4 18 * * *', () => {
    FeedbackMailer.verify();
  });
  schedule.scheduleJob('* 15 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
  });
  schedule.scheduleJob('30 17 * * *', () => {
    VotationStartMailer.verify();
    CheckoutStartMailer.verify();
    LastChanceMailer.verify();
    FeedbackMailer.verify();
  });
};

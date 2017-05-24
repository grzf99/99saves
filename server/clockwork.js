const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');
const CheckoutStartMailer = require('./mailers/checkout-start');
const LastChanceMailer = require('./mailers/last-chance');
const FeedbackMailer = require('./mailers/feedback');

module.exports = () => {
  schedule.scheduleJob('* 13 * * *', () => {
    VotationStartMailer.verify();
  });
  schedule.scheduleJob('1 13 * * *', () => {
    CheckoutStartMailer.verify();
  });
  schedule.scheduleJob('2 13 * * *', () => {
    LastChanceMailer.verify();
  });
  schedule.scheduleJob('3 13 * * *', () => {
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

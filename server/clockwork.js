const schedule = require('node-schedule');
const VotationStartMailer = require('./mailers/votation-start');

module.exports = () => {
  schedule.scheduleJob('0 1 * * *', () => VotationStartMailer.verify());
};

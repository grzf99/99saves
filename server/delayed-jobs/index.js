const kue = require('kue');
const emailProcessor = require('./email');
const votationStartProcessor = require('./votation-start');
const checkoutStartProcessor = require('./checkout-start');
const lastChanceProcessor = require('./last-chance');
const feedbackProcessor = require('./feedback');
const negotiationStartProcessor = require('./negotiation-start');

const options = {
  redis: process.env.NODE_ENV === 'production'
    ? process.env.REDIS_URL
    : undefined
};

module.exports = () => {
  const queue = kue.createQueue(options);

  queue.process('email', emailProcessor);
  queue.process('negotiation-start', negotiationStartProcessor);
  queue.process('votation-start', votationStartProcessor);
  queue.process('checkout-start', checkoutStartProcessor);
  queue.process('last-chance', lastChanceProcessor);
  queue.process('feedback', feedbackProcessor);

  global.queue = queue;
};

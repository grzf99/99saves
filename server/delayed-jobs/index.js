const kue = require('kue');
const emailProcessor = require('./email');
const votationStartProcessor = require('./votation-start');

const options = {
  redis: process.env.NODE_ENV === 'production'
    ? process.env.REDIS_URL
    : undefined
};
const queue = kue.createQueue(options);

queue.process('email', emailProcessor);
queue.process('votation-start', votationStartProcessor);

module.exports = queue;

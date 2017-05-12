const ms = require('ms');
const startClockwork = require('../clockwork');

jest.mock('../mailers/votation-start');
const VotationStartMailer = require('../mailers/votation-start');

jest.useFakeTimers();

test('should run VotationStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(VotationStartMailer.verify).toHaveBeenCalledTimes(1);
});

const ms = require('ms');
const startClockwork = require('../clockwork');

jest.mock('../mailers/votation-start');
jest.mock('../mailers/checkout-start');
const VotationStartMailer = require('../mailers/votation-start');
const CheckoutStartMailer = require('../mailers/checkout-start');

afterEach(() => {
  VotationStartMailer.verify.mockClear();
  CheckoutStartMailer.verify.mockClear();
});

jest.useFakeTimers();

test('should run VotationStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(VotationStartMailer.verify).toHaveBeenCalledTimes(1);
});

test('should run CheckoutStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(CheckoutStartMailer.verify).toHaveBeenCalledTimes(1);
});

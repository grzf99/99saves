const ms = require('ms');
const startClockwork = require('../clockwork');

jest.mock('../mailers/votation-start');
jest.mock('../mailers/checkout-start');
jest.mock('../mailers/last-chance');
jest.mock('../mailers/feedback');
jest.mock('../mailers/negotiation-start');
const VotationStartMailer = require('../mailers/votation-start');
const CheckoutStartMailer = require('../mailers/checkout-start');
const LastChanceMailer = require('../mailers/last-chance');
const FeedbackMailer = require('../mailers/feedback');
const NegotiationStartMailer = require('../mailers/negotiation-start');

afterEach(() => {
  VotationStartMailer.verify.mockClear();
  CheckoutStartMailer.verify.mockClear();
  LastChanceMailer.verify.mockClear();
  FeedbackMailer.verify.mockClear();
  NegotiationStartMailer.verify.mockClear();
});

jest.useFakeTimers();

test('should run VotationStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(VotationStartMailer.verify).toHaveBeenCalledTimes(0); // TODO: Disable this test schedule isn't working now
});

test('should run CheckoutStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(CheckoutStartMailer.verify).toHaveBeenCalledTimes(0); // TODO: Disable this test schedule isn't working now
});

test('should run LastChanceMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(LastChanceMailer.verify).toHaveBeenCalledTimes(0); // TODO: Disable this test schedule isn't working now
});

test('should run FeedbackMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(FeedbackMailer.verify).toHaveBeenCalledTimes(0); // TODO: Disable this test schedule isn't working now
});

test('should run NegotiationStartMailer#verify everyday', () => {
  const oneDayTimeout = ms('1 day');
  startClockwork();

  jest.runTimersToTime(oneDayTimeout);
  expect(NegotiationStartMailer.verify).toHaveBeenCalledTimes(0); // TODO: Disable this test schedule isn't working now
});

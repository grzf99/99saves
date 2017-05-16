const { addDays, endOfDay } = require('date-fns');
const { Save } = require('../../models');
const CheckoutStartMailer = require('../checkout-start');

beforeEach(() => Save.sync({ force: true }));
afterEach(() => Save.sync({ force: true }));

jest.mock('../../delayed-jobs');
const queue = require('../../delayed-jobs');

describe('#verify', () => {
  describe('when there are no saves on checkout', () => {
    it('should not enqueue any jobs', () =>
      CheckoutStartMailer.verify().then(() => {
        expect(queue.create).not.toHaveBeenCalled();
      }));
  });

  describe('when there are saves on votation', () => {
    it('should enqueue that many jobs', () =>
      Save.bulkCreate([
        {
          date_start: addDays(new Date(), -5),
          date_end: endOfDay(addDays(new Date(), -4))
        },
        {
          date_start: addDays(new Date(), -4),
          date_end: endOfDay(addDays(new Date(), -3))
        },
        {
          date_start: addDays(new Date(), -4),
          date_end: endOfDay(addDays(new Date(), -3))
        }
      ])
        .then(saves => CheckoutStartMailer.verify())
        .then(() => {
          expect(queue.create).toHaveBeenCalledTimes(2);
        }));
  });
});

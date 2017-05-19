const { addDays, endOfDay } = require('date-fns');
const { Save, Product, Provider } = require('../../models');
const FeedbackMailer = require('../feedback');

beforeEach(() =>
  Save.sync({ force: true })
    .then(() => Product.sync({ force: true }))
    .then(() => Provider.sync({ force: true }))
);
afterEach(() =>
  Save.sync({ force: true })
    .then(() => Product.sync({ force: true }))
    .then(() => Provider.sync({ force: true }))
);

jest.mock('../../delayed-jobs');
global.queue = require('../../delayed-jobs');

describe('#verify', () => {
  describe('when there are no saves on votation', () => {
    it('should not enqueue any jobs', () =>
      FeedbackMailer.verify().then(() => {
        expect(global.queue.create).not.toHaveBeenCalled();
      }));
  });

  describe('when there are saves ready to receive feedback', () => {
    it('should enqueue that many jobs', () =>
      Save.bulkCreate([
        {
          date_start: addDays(new Date(), -15),
          date_end: endOfDay(addDays(new Date(), -13))
        },
        {
          date_start: addDays(new Date(), -15),
          date_end: endOfDay(addDays(new Date(), -13))
        },
        {
          date_start: addDays(new Date(), -3),
          date_end: endOfDay(addDays(new Date(), -2))
        }
      ])
        .then(() => FeedbackMailer.verify())
        .then(() => {
          expect(global.queue.create).toHaveBeenCalledTimes(2);
        }));
  });
});

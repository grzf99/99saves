const { addDays, startOfDay, endOfDay } = require('date-fns');
const { Cicle, Product, Provider } = require('../../models');
const NegotiationStartMailer = require('../negotiation-start');

beforeEach(() =>
  Cicle.sync({ force: true })
);
afterEach(() =>
  Cicle.sync({ force: true })
);

jest.mock('../../delayed-jobs');
global.queue = require('../../delayed-jobs');

describe('#verify', () => {
  describe('when there are no saves on negotiation', () => {
    it('should not enqueue any jobs', () =>
      NegotiationStartMailer.verify().then(() => {
        expect(global.queue.create).not.toHaveBeenCalled();
      }));
  });

  describe('when there are saves on negotiation', () => {
    it('should enqueue that many jobs', () =>
      Cicle.bulkCreate([
        {
          date_start: addDays(startOfDay(new Date()), -2),
          date_end: addDays(endOfDay(new Date()), -1)
        },
        {
          date_start: addDays(startOfDay(new Date()), -2),
          date_end: addDays(endOfDay(new Date()), -1)
        }
      ])
        .then(() => NegotiationStartMailer.verify())
        .then(() => {
          expect(global.queue.create).toHaveBeenCalledTimes(2);
        }));
  });
});

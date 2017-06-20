const { addDays, startOfDay, endOfDay } = require('date-fns');
const { Save, Product, Provider } = require('../../models');
const VotationStartMailer = require('../votation-start');

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
      VotationStartMailer.verify().then(() => {
        expect(global.queue.create).not.toHaveBeenCalled();
      }));
  });

  // describe('when there are saves on votation', () => {
  //   it('should enqueue that many jobs', () =>
  //     Save.bulkCreate([
  //       {
  //         date_start: addDays(startOfDay(new Date()), -4),
  //         date_end: addDays(endOfDay(new Date()), -3)
  //       },
  //       {
  //         date_start: addDays(startOfDay(new Date()), -4),
  //         date_end: addDays(endOfDay(new Date()), -3)
  //       }
  //     ])
  //       .then(() => VotationStartMailer.verify())
  //       .then(() => {
  //         expect(global.queue.create).toHaveBeenCalledTimes(2);
  //       }));
  // });
});

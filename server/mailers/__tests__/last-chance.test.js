const { addDays, endOfDay } = require('date-fns');
const { Save, Product, Provider } = require('../../models');
const LastChanceMailer = require('../last-chance');

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
  describe('when there are no saves on checkout', () => {
    it('should not enqueue any jobs', () =>
      LastChanceMailer.verify().then(() => {
        expect(global.queue.create).not.toHaveBeenCalled();
      }));
  });

  // describe('when there are saves on votation', () => {
  //   it('should enqueue that many jobs', () =>
  //     Save.bulkCreate([
  //       {
  //         checkout_end: endOfDay(new Date())
  //       },
  //       {
  //         checkout_end: endOfDay(new Date())
  //       }
  //     ])
  //       .then(saves => LastChanceMailer.verify())
  //       .then(() => {
  //         expect(global.queue.create).toHaveBeenCalledTimes(2);
  //       }));
  // });
});

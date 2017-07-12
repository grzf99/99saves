const { Cicle, Save, Subscription, User, Product } = require('../../models');
const checkoutStartProcessor = require('../checkout-start');

beforeEach(() =>
  User.sync({ force: true })
    .then(() => Cicle.sync({ force: true }))
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
    .then(() => Product.sync({ force: true }))
);
afterEach(() =>
  User.sync({ force: true })
    .then(() => Cicle.sync({ force: true }))
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
    .then(() => Product.sync({ force: true }))
);

jest.mock('../index');
global.queue = require('../index');

const job = {
  data: {}
};

describe('when there are no subscriptions on the save', () => {
  const cb = jest.fn();
  it('should not enqueue any jobs', () =>
    Save.create({ title: 'mySave checkout Start' })
      .then((save) => {
        Cicle.create({ SaveId: save.id })
          .then((cicle) => {
            job.data.cicle = cicle;
            return Product.create({
              title: 'My product checkout start',
              price: 10,
              CicleId: cicle.id
            });
          })
          .then(() => Cicle.findById(job.data.cicle.id, { include: [Product] }))
          .then((cicle) => {
            job.data.cicle = cicle;
          })
          .then(() => checkoutStartProcessor(job, cb))
          .then(() => {
            expect(cb).toHaveBeenCalled();
            expect(global.queue.create).not.toHaveBeenCalled();
          })
      })
    )
});

describe('when there are subscriptions on the save', () => {
  const cb = jest.fn();
  it('should enqueue that many email jobs', () =>
    Save.create({ title: 'mySave checkout Start' })
      .then((save) => {
        Promise.all([
          Cicle.create({ SaveId: save.id }),
          User.create({ email: 'asd@asdcheckout2123.com', password: '1234' })
        ])
          .then(([cicle, user]) => {
            job.data.cicle = cicle;
            return Promise.all([
              Product.create({ title: 'My product checkout 123', price: 10, CicleId: cicle.id }),
              Subscription.create({ UserId: user.id, CicleId: cicle.id })
            ]);
          })
          .then(() => Cicle.findById(job.data.cicle.id, { include: [Product] }))
          .then((cicle) => {
            job.data.cicle = cicle;
          })
          .then(() => checkoutStartProcessor(job, cb))
          .then(() => {
            expect(cb).toHaveBeenCalled();
            expect(global.queue.create).toHaveBeenCalledTimes(1);
          })
      })
    )
});

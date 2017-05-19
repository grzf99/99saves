const { Save, Subscription, User, Product } = require('../../models');
const feedbackProcessor = require('../feedback');

beforeEach(() =>
  User.sync({ force: true })
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
    .then(() => Product.sync({ force: true }))
);
afterEach(() =>
  User.sync({ force: true })
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
    Save.create({ title: 'mySave' })
      .then((save) => {
        job.data.save = save;
        return Product.create({
          title: 'My product',
          price: 10,
          SaveId: save.id
        });
      })
      .then(() => Save.findById(job.data.save.id, { include: [Product] }))
      .then((save) => {
        job.data.save = save;
      })
      .then(() => feedbackProcessor(job, cb))
      .then(() => {
        expect(cb).toHaveBeenCalled();
        expect(global.queue.create).not.toHaveBeenCalled();
      }));
});

describe('when there are subscriptions on the save', () => {
  const cb = jest.fn();
  it('should enqueue that many email jobs', () =>
    Promise.all([
      Save.create({ title: 'mySave' }),
      User.create({ email: 'asd@asd.com', password: '1234' })
    ])
      .then(([save, user]) => {
        job.data.save = save;
        return Promise.all([
          Product.create({ title: 'My product', price: 10, SaveId: save.id }),
          Subscription.create({ UserId: user.id, SaveId: save.id })
        ]);
      })
      .then(() => Save.findById(job.data.save.id, { include: [Product] }))
      .then((save) => {
        job.data.save = save;
      })
      .then(() => feedbackProcessor(job, cb))
      .then(() => {
        expect(cb).toHaveBeenCalled();
        expect(global.queue.create).toHaveBeenCalledTimes(1);
      }));
});

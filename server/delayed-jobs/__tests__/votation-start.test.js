const { Save, Subscription, User } = require('../../models');
const votationStartProcessor = require('../votation-start');

beforeEach(() =>
  User.sync({ force: true })
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
);
afterEach(() =>
  User.sync({ force: true })
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
);

jest.mock('../index');
const queue = require('../index');

const job = {
  data: {}
};

describe('when there are no subscriptions on the save', () => {
  const cb = jest.fn();
  it('should not enqueue any jobs', () =>
    Save.create({ title: 'mySave' })
      .then((save) => {
        job.data.save = save;
        return votationStartProcessor(job, cb);
      })
      .then(() => {
        expect(cb).toHaveBeenCalled();
        expect(queue.create).not.toHaveBeenCalled();
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
        return Subscription.create({ UserId: user.id, SaveId: save.id });
      })
      .then(() => votationStartProcessor(job, cb))
      .then(() => {
        expect(cb).toHaveBeenCalled();
        expect(queue.create).toHaveBeenCalledTimes(1);
      }));
});

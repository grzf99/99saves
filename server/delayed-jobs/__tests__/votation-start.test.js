const { Cicle, Save, Subscription, User } = require('../../models');
const votationStartProcessor = require('../votation-start');

beforeEach(() =>
  User.sync({ force: true })
    .then(() => Cicle.sync({ force: true }))
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
);
afterEach(() =>
  User.sync({ force: true })
    .then(() => Cicle.sync({ force: true }))
    .then(() => Save.sync({ force: true }))
    .then(() => Subscription.sync({ force: true }))
);

jest.mock('../index');
global.queue = require('../index');

const job = {
  data: {}
};

describe('when there are no subscriptions on the save', () => {
  const cb = jest.fn();
  it('should not enqueue any jobs', () =>
    Save.create({ title: 'mySave Votation Start' })
      .then((save) => {
        Cicle.create({ SaveId: save.id })
          .then((cicle) => {
            job.data.cicle = cicle;
            return votationStartProcessor(job, cb);
          })
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
    Save.create({ title: 'mySave Votation Start' })
      .then((save) => {
        Promise.all([
          Cicle.create({ SaveId: save.id }),
          User.create({ email: 'asd@asdvotat12.com', password: '1234' })
        ])
          .then(([cicle, user]) => {
            job.data.cicle = cicle;
            return Subscription.create({ UserId: user.id, CicleId: save.id });
          })
          .then(() => votationStartProcessor(job, cb))
          .then(() => {
            expect(cb).toHaveBeenCalled();
            expect(global.queue.create).toHaveBeenCalledTimes(1);
          })
        })
      )
});

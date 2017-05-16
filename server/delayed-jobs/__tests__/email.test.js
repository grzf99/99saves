const emailProcessor = require('../email');

jest.mock('juice');
jest.mock('../../../utils/mailers/compileTemplate');
jest.mock('../../../utils/mailers/sendMail');
const juice = require('juice');
const compileTemplate = require('../../../utils/mailers/compileTemplate');
const sendMail = require('../../../utils/mailers/sendMail');

const job = {
  data: {
    to: 'asd@asd.com',
    subject: 'My mail',
    template: 'my-template',
    context: {}
  }
};

describe('when template compilation and mail request succeeds', () => {
  const cb = jest.fn();
  it('should have called juice to inline email styles', () =>
    emailProcessor(job, cb).then(() => {
      expect(juice).toHaveBeenCalled();
    }));

  it('should have called the callback', () =>
    emailProcessor(job, cb).then((result) => {
      expect(cb).toHaveBeenCalled();
    }));
});

describe('when template compilation fails', () => {
  const cb = jest.fn();
  beforeEach(() => {
    compileTemplate.__setFailPromise(true);
  });

  it('should have called the callback with the error', () =>
    emailProcessor(job, cb).then(() => {
      expect(cb.mock.calls[0][0] instanceof Error);
    }));
});

describe('when template compilation succeeds, but mail request is rejected', () => {
  const cb = jest.fn();
  beforeEach(() => {
    sendMail.__setFailPromise(true);
  });

  it('should have called the callback with the error', () =>
    emailProcessor(job, cb).then(() => {
      expect(cb.mock.calls[0][0] instanceof Error);
    }));
});

const SignupWelcomeMailer = require('../signup-welcome');

jest.mock('juice');
jest.mock('../../../utils/mailers/compileTemplate');
jest.mock('../../../utils/mailers/sendMail');
const juice = require('juice');
const compileTemplate = require('../../../utils/mailers/compileTemplate');
const sendMail = require('../../../utils/mailers/sendMail');

describe('when template compilation and mail request succeeds', () => {
  it('should have called juice to inline email styles', () =>
    SignupWelcomeMailer.mail('user@asd.com', {}).then(() => {
      expect(juice).toHaveBeenCalled();
    }));

  it('should return a 200 status code', () =>
    SignupWelcomeMailer.mail('user@asd.com', {}).then((result) => {
      expect(result.statusCode).toEqual(200);
    }));
});

describe('when template compilation fails', () => {
  beforeEach(() => {
    compileTemplate.__setFailPromise(true);
    global.console.log = jest.fn();
  });

  it('should log the error', () => {
    SignupWelcomeMailer.mail('user@asd.com', {});
    expect(console.log).toHaveBeenCalled();
  });
});

describe('when template compilation succeeds, but mail request is rejected', () => {
  beforeEach(() => {
    sendMail.__setFailPromise(true);
    global.console.log = jest.fn();
  });

  it('should log the error', () => {
    SignupWelcomeMailer.mail('user@asd.com', {});
    expect(console.log).toHaveBeenCalled();
  });
});

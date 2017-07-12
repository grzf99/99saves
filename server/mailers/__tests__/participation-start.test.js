const ParticipationStartMailer = require('../participation-start');

jest.mock('juice');
jest.mock('../../../utils/mailers/compileTemplate');
jest.mock('../../../utils/mailers/sendMail');
const juice = require('juice');
const compileTemplate = require('../../../utils/mailers/compileTemplate');
const sendMail = require('../../../utils/mailers/sendMail');

describe('when template compilation and mail request succeeds', () => {
  it('should have called juice to inline email styles', () =>
    ParticipationStartMailer.mail('user@asd.com', {cicle: {Save:{title:'Save'}}}).then(() => {
      expect(juice).toHaveBeenCalled();
    }));

  it('should return a 200 status code', () =>
    ParticipationStartMailer.mail('user@asd.com', {cicle: {Save:{title:'Save'}}}).then((result) => {
      expect(result.statusCode).toEqual(200);
    }));
});

describe('when template compilation fails', () => {
  beforeEach(() => {
    compileTemplate.__setFailPromise(true);
    global.console.log = jest.fn();
  });

  it('should log the error', () => {
    ParticipationStartMailer.mail('user@asd.com', {cicle: {Save:{title:'Save'}}});
    expect(console.log).toHaveBeenCalled();
  });
});

describe('when template compilation succeeds, but mail request is rejected', () => {
  beforeEach(() => {
    sendMail.__setFailPromise(true);
    global.console.log = jest.fn();
  });

  it('should log the error', () => {
    ParticipationStartMailer.mail('user@asd.com', {cicle: {Save:{title:'Save'}}});
    expect(console.log).toHaveBeenCalled();
  });
});

const MockResponse = require('mock-express-response');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const authController = require('../auth');

beforeAll(() => require('dotenv').config())
beforeEach(() => User.sync({ force: true }))

describe('login', () => {
  const req = {
    body: {
      email: 'jonsnow@winterfell.com',
      password: '123456'
    }
  };

  describe('when user exists', () => {
    describe('when password is correct', () => {
      it('should return 200 and a user object', () => {
        const res = new MockResponse();
        return bcrypt.hash(req.body.password, 10)
          .then((passwordHash) => (
            User.create(Object.assign({}, req.body, { passwordHash }))
          ))
          .then(() => authController.login(req, res))
          .then(() => {
            expect(res.statusCode).toEqual(200);
            expect(res._getJSON()).toEqual(expect.objectContaining({
              name: null,
              email: expect.any(String),
              admin: expect.any(Boolean),
              token: expect.any(String)
            }));
          });
      });
    });

    describe('when password is incorrect', () => {
      it('should return 422', () => {
        const res = new MockResponse();
        return bcrypt.hash('anyOtherPassword', 10)
          .then((passwordHash) => (
            User.create(Object.assign({}, req.body, { passwordHash }))
          ))
          .then(() => authController.login(req, res))
          .then(() => {
            expect(res.statusCode).toEqual(422);
          });
      });
    });
  });

  describe('when user does not exist', () => {
    it('should return 422', () => {
      const res = new MockResponse();
      return authController.login(req, res)
        .then(() => {
          expect(res.statusCode).toEqual(422);
        });
    });
  });
});

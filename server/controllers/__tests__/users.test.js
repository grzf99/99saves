const MockResponse = require('mock-express-response');
const { User } = require('../../models');
const usersController = require('../users');

beforeAll(() => {
  require('dotenv').config();
  return User.sync({ force: true });
});

describe('create', () => {
  describe('when user does not exist', () => {
    const req = {
      body: {
        user: {
          name: 'Jon Snow',
          email: 'jonsnow@winterfell.com',
          password: '123456'
        }
      }
    };

    it('should create the user and return 201', () => {
      const res = new MockResponse();
      return usersController.create(req, res).then((count) => {
        expect(res.statusCode).toEqual(201);
        expect(res._getJSON()).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            admin: expect.any(Boolean),
            token: expect.any(String)
          })
        );
      });
    });
  });

  describe('when user already exists', () => {
    const req = {
      body: {
        user: {
          name: 'Sansa Stark',
          email: 'sansa@winterfell.com',
          password: '123456'
        }
      }
    };

    it('should not create the user and return 422', () => {
      const res = new MockResponse();
      return User.create(Object.assign({}, req.body.user))
        .then(() => usersController.create(req, res))
        .then((count) => {
          expect(res.statusCode).toEqual(422);
        });
    });
  });
});

describe('isAvailable', () => {
  describe('when user exists', () => {
    it('should return false', () => {
      const user = {
        email: 'asd@asd.com',
        password: '12345678'
      };
      const req = {
        query: {
          email: 'asd@asd.com'
        }
      };
      const res = new MockResponse();

      return User.create(user)
        .then(() => usersController.isAvailable(req, res))
        .then(() => {
          expect(res.statusCode).toEqual(200);
          expect(res._getJSON()).toEqual({
            isAvailable: false
          });
        });
    });
  });

  describe('when user does not exist', () => {
    it('should return true', () => {
      const req = {
        query: {
          email: 'qwe@qwe.com'
        }
      };
      const res = new MockResponse();

      return usersController.isAvailable(req, res).then(() => {
        expect(res.statusCode).toEqual(200);
        expect(res._getJSON()).toEqual({
          isAvailable: true
        });
      });
    });
  });
});

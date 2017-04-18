const MockResponse = require('mock-express-response');
const { User } = require('../../models');
const usersController = require('../users');

beforeAll(() => require('dotenv').config())
beforeEach(() => User.sync({ force: true }))

let req = {}

describe('create', () => {
  describe('when user does not exist', () => {
    it('should create the user and return 201', () => {
      const res = new MockResponse();
      req.body = {
        user: {
          name: 'Jon Snow',
          email: 'jonsnow@winterfell.com',
          password: '123456'
        }
      };

      return usersController.create(req, res)
        .then(() => User.count())
        .then((count) => {
          expect(res.statusCode).toEqual(201);
          expect(res._getJSON()).toEqual(expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            admin: expect.any(Boolean),
            token: expect.any(String)
          }))
          expect(count).toEqual(1);
        });
    });
  });

  describe('when user already exists', () => {
    it('should not create the user and return 422', () => {
      const res = new MockResponse();
      req.body = {
        user: {
          name: 'Jon Snow',
          email: 'jonsnow@winterfell.com',
          password: '123456'
        }
      };

      return User.create(Object.assign({}, req.body.user))
        .then(() => usersController.create(req, res))
        .then(() => User.count())
        .then((count) => {
          expect(res.statusCode).toEqual(422);
          expect(count).toEqual(1);
        })
    });
  })
});

const MockResponse = require('mock-express-response');
const { User, Profile } = require('../../models');
const usersController = require('../users');

jest.mock('../../mailers/signup-welcome');
const SignupWelcomeMailer = require('../../mailers/signup-welcome');

beforeEach(() => {
  require('dotenv').config();
  return User.sync({ force: true }).then(() => Profile.sync({ force: true }));
});

afterEach(() =>
  User.sync({ force: true }).then(() => Profile.sync({ force: true }))
);

describe('create', () => {
  describe('when user does not exist', () => {
    const req = {
      body: {
        user: {
          email: 'jonsnow@winterfell.com',
          password: '123456'
        }
      }
    };

    it('should create the user and return 201', () => {
      const res = new MockResponse();
      return usersController
        .create(req, res)
        .then(() => User.count())
        .then((count) => {
          expect(res.statusCode).toEqual(201);
          expect(count).toEqual(1);
          expect(res._getJSON()).toEqual(
            expect.objectContaining({
              email: expect.any(String),
              admin: expect.any(Boolean),
              token: expect.any(String)
            })
          );
          expect(SignupWelcomeMailer.mail).toHaveBeenCalled();
        });
    });
  });

  describe('when user already exists', () => {
    const req = {
      body: {
        user: {
          email: 'sansa@winterfell.com',
          password: '123456'
        }
      }
    };

    it('should not create the user and return 422', () => {
      const res = new MockResponse();
      return User.create(req.body.user)
        .then(() => usersController.create(req, res))
        .then(() => {
          expect(res.statusCode).toEqual(422);
        });
    });
  });

  describe('when profile is passed', () => {
    const req = {
      body: {
        user: {
          email: 'jonsnow@winterfell.com',
          password: '123456',
          profile: {
            name: 'Jon Snow',
            cpf: '11111111',
            city: 'Goiania',
            state: 'GO'
          }
        }
      }
    };

    it('should create the user, the profile and return 201', () => {
      const res = new MockResponse();
      return usersController
        .create(req, res)
        .then(() => Promise.all([User.count(), Profile.count()]))
        .then(([userCount, profileCount]) => {
          expect(res.statusCode).toEqual(201);
          expect(userCount).toEqual(1);
          expect(profileCount).toEqual(1);
          expect(res._getJSON()).toEqual(
            expect.objectContaining({
              email: expect.any(String),
              admin: expect.any(Boolean),
              token: expect.any(String)
            })
          );
          expect(SignupWelcomeMailer.mail).toHaveBeenCalled();
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
          email: 'non.existent.user@example.org'
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

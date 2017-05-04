const MockResponse = require('mock-express-response');
const { Provider } = require('../../models');
const providersController = require('../providers');

beforeAll(() => {
  require('dotenv').config()
  return Provider.sync({ force: true })
});

describe('create', () => {
  describe('when provider does not exist', () => {
    const req = {
      body: {
        name: 'Provider test',
        email: 'contact@providerteste.com',
        cnpj: '123456789012',
        address: 'street avenue',
        responsible: 'Josh Nieh',
        phone: '13456789098',
        logo: 'https://res.cloudinary.com/kevinsoul/image/upload/v1492435685/dkv45lnh4lpijr3oea4u.png',
      }
    };

    it('should create the provider and return 201', () => {
      const res = new MockResponse();
      return providersController.create(req, res)
        .then((count) => {
          expect(res.statusCode).toEqual(201);
          expect(res._getJSON()).toEqual(expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            cnpj: expect.any(String),
            address: expect.any(String),
            responsible: expect.any(String),
            phone: expect.any(String),
            logo: expect.any(String)
          }))
        });
    });
  });

  describe('when provider already exists', () => {
    const req = {
      body: {
        name: 'Provider test2',
        email: 'contact1234@providerteste2.com',
        cnpj: '1234567890122',
        address: 'street avenue2',
        responsible: 'Josh Nieh2',
        phone: '134567890982',
        logo: 'https://res.cloudinary.com/kevinsoul/image/upload/v1492435685/dkv45lnh4lpijr3oea4u2.png',
      }
    };

    it('should not create the provider and return 422', () => {
      const res = new MockResponse();
      return Provider.create(Object.assign({}, req.body))
        .then(() => providersController.create(req, res))
        .then((count) => {
          expect(res.statusCode).toEqual(400);
        })
    });
  })
});

describe('update', () => {
  describe('when provider already exist', () => {
    const req = {
      body: {
        name: 'Provider test update',
        email: 'contactupdate@providertesteupdate.com',
        cnpj: '123456789012',
        address: 'street avenue update',
        responsible: 'Josh Nieh',
        phone: '13456789098123',
        logo: 'https://res.cloudinary.com/kevinsoul/image/upload/v1492435685/dkv45lnh4lpijr3oea4u.png',
      },
      params: {
        id: 4
      }
    };

    it('should update the provider and return 200', () => {
      const res = new MockResponse();
      return Provider.create(Object.assign({}, req.body))
        .then(() => providersController.update(req, res))
        .then((count) => {
          expect(res.statusCode).toEqual(200);
          expect(res._getJSON()).toEqual(expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            cnpj: expect.any(String),
            address: expect.any(String),
            responsible: expect.any(String),
            phone: expect.any(String),
            logo: expect.any(String)
          }))
        });
    });
  });

  describe('when provider does not have input value required', () => {
    const req = {
      body: {
        name: 'Provider test update',
        email: null,
        cnpj: '123456789012',
        address: 'street avenue update',
        responsible: 'Josh Nieh',
        phone: '13456789098123',
        logo: 'https://res.cloudinary.com/kevinsoul/image/upload/v1492435685/dkv45lnh4lpijr3oea4u.png',
      },
      params: {
        id: 4
      }
    };

    it('provider email is null', () => {
      const res = new MockResponse();
      return providersController.update(req, res)
        .then((count) => {
          expect(res.statusCode).toEqual(400);
        });
    });
  });
});

describe('deletete', () => {
  describe('when provider already exist', () => {
    const req = {
      params: {
        id: 1
      }
    };

    it('should delete the provider and return 200', () => {
      const res = new MockResponse();
      return providersController.delete(req, res)
        .then((count) => {
          expect(res.statusCode).toEqual(200);
        });
    });
  });
});
module.exports = {
  create: jest.fn(() => ({
    removeOnComplete: jest.fn(() => ({
      save: jest.fn()
    }))
  }))
};

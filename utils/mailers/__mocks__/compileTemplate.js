const mockValues = {
  failPromise: false,
  returnValue: '<div>lol</div>'
};

const compileTemplateMock = () => {
  if (!mockValues.failPromise) {
    return Promise.resolve(mockValues.returnValue);
  }
  throw new Error('Failed to compile template');
};

compileTemplateMock.__setFailPromise = (fail) => {
  mockValues.failPromise = fail;
};

compileTemplateMock.__setReturnValue = (value) => {
  mockValues.returnValue = value;
};

module.exports = compileTemplateMock;

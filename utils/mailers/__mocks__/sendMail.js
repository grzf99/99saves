let failPromise = false;

const sendMailMock = () => {
  if (!failPromise) {
    return Promise.resolve({ statusCode: 200 });
  }
  return Promise.reject();
};

sendMailMock.__setFailPromise = (fail) => {
  failPromise = fail;
};

module.exports = sendMailMock;

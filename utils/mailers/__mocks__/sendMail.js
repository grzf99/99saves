let failPromise = false;

const sendMailMock = () => {
  if (!failPromise) {
    return Promise.resolve({ statusCode: 200 });
  }
  throw new Error('Failed to send email');
};

sendMailMock.__setFailPromise = (fail) => {
  failPromise = fail;
};

module.exports = sendMailMock;

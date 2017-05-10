const path = require('path');
const compileTemplate = require('../compileTemplate');

jest.mock('fs');
const fs = require('fs');

const FS_MOCK_FILES = {
  [path.join(
    __dirname,
    '../../server/templates/mailers/my-template.hbs'
  )]: '<div>{{ user.name }}</div>'
};

beforeEach(() => {
  fs.__setMockFiles(FS_MOCK_FILES);
});

describe('when template exists', () => {
  it('should compile its contents', () => {
    const user = { name: 'Jon Snow' };
    return compileTemplate('mailers/my-template.hbs', { user }).then((result) => {
      expect(result).toEqual('<div>Jon Snow</div>');
    });
  });
});

describe('when template does not exist', () => {
  it('should throw an error', () =>
    compileTemplate('mailers/non-existent.hbs').catch(err =>
      expect(err).toEqual('File does not exist')
    ));
});

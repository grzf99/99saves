const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.assign({}, mockFiles, newMockFiles);
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readFile(filePath, encoding, cb) {
  if (mockFiles[filePath] === undefined) {
    return cb('File does not exist');
  }

  return cb(null, mockFiles[filePath]);
}

fs.__setMockFiles = __setMockFiles;
fs.readFile = readFile;

module.exports = fs;

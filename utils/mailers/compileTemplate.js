const fs = require('fs');
const path = require('path');
const Handlebars = require('./setupHandlebars');
const buildContext = require('./buildContext');

module.exports = (templatePath, context) =>
  new Promise((resolve, reject) => {
    const finalPath = path.join(
      __dirname,
      '../../server/templates',
      templatePath
    );
    fs.readFile(finalPath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      const finalContext = buildContext(context);
      const template = Handlebars.compile(data);
      resolve(template(finalContext));
    });
  });

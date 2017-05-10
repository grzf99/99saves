const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

module.exports = (templatePath, context) =>
  new Promise((resolve, reject) => {
    const finalPath = path.join(__dirname, '../server/templates', templatePath);
    fs.readFile(finalPath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      const template = Handlebars.compile(data);
      resolve(template(context));
    });
  });

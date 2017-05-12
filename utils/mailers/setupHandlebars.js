const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const formatCurrency = require('../formatCurrency');

Handlebars.registerHelper('currency', formatCurrency);

const partialsDir = path.join(
  __dirname,
  '../../server/templates/mailers/partials'
);
const filenames = fs.readdirSync(partialsDir);

filenames.forEach((filename) => {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }

  const [_, name] = matches;
  const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8');
  Handlebars.registerPartial(name, template);
});

module.exports = Handlebars;

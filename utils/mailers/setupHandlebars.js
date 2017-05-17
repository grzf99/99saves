const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const dateFns = require('date-fns');
const formatCurrency = require('../formatCurrency');

Handlebars.registerHelper('currency', formatCurrency);
Handlebars.registerHelper('formatDate', dateFns.format);

const partialsDir = path.join(
  __dirname,
  '../../server/templates/mailers/partials'
);
const filenames = fs.readdirSync(partialsDir);

if (filenames !== undefined) {
  filenames.forEach((filename) => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }

    const [_, name] = matches;
    const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8');
    Handlebars.registerPartial(name, template);
  });
}

module.exports = Handlebars;

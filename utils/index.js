const renderAndCache = require('./renderAndCache');
const numeral = require('./numeral');
const slugify = require('./slugify');
const savesMapper = require('./savesMapper');
const formatCurrency = require('./formatCurrency');
const pluralize = require('./pluralize');

const noop = () => {};

module.exports = {
  renderAndCache,
  numeral,
  slugify,
  savesMapper,
  formatCurrency,
  noop,
  pluralize
};

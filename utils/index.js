const renderAndCache = require('./renderAndCache');
const slugify = require('./slugify');
const savesMapper = require('./savesMapper');
const formatCurrency = require('./formatCurrency');
const pluralize = require('./pluralize');
const isDateBetween = require('./isDateBetween');
const getSaveStatus = require('./getSaveStatus');

const noop = () => {};

module.exports = {
  renderAndCache,
  slugify,
  savesMapper,
  formatCurrency,
  noop,
  pluralize,
  isDateBetween,
  getSaveStatus
};

const accounting = require('accounting');

function formatCurrency(value) {
  return accounting.formatMoney(value, '', 2, '.', ',');
}

module.exports = formatCurrency;

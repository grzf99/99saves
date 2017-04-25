const numeral = require('./numeral');

function formatCurrency(value) {
  return numeral(value).format('0,0[.]00');
}

module.exports = formatCurrency;

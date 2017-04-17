import numeral from 'numeral';

if (!numeral.locales['pt-br']) {
  numeral.register('locale', 'pt-BR', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: 'º',
    currency: {
      symbol: 'R$'
    }
  });
}

numeral.locale('pt-BR');

module.exports = numeral;

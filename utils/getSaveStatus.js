const statuses = {
  'pre-subscription': 'Pré-Adesão',
  subscription: 'Adesão',
  negotiation: 'Negociação',
  votation: 'Votação',
  checkout: 'Compra',
  finished: 'Finalizado'
};

module.exports = status => statuses[status];

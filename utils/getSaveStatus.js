const statuses = {
  'pre-subscription': 'Pré-Adesão',
  subscription: 'Adesão',
  negotiation: 'Negociação',
  votation: 'Votação',
  checkout: 'Compra',
  finished: 'Finalizado',
  'no-offers': 'Sem ofertas'
};

module.exports = status => statuses[status];

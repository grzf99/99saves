const statuses = {
  'pre-subscription': 'Pré-Adesão',
  subscription: 'Adesão',
  negotiation: 'Negociação',
  votation: 'Votação',
  checkout: 'Compra',
  finished: 'Finalizado'
};

module.exports = save => statuses[save.status];

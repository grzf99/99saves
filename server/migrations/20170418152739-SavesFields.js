'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Saves',
        'votation_end',
        Sequelize.DATE
      ),
      queryInterface.addColumn(
        'Saves',
        'checkout_end',
        Sequelize.DATE
      )
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Saves', 'votation_end'),
      queryInterface.removeColumn('Saves', 'checkout_end')
    ]);
  }
};

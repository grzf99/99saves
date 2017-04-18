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
  }
};

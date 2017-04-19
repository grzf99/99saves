'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Saves',
      'slug',
      Sequelize.STRING
    );
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Saves', 'slug')
    ]);
  }
};

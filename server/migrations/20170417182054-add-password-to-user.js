'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'password',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'password');
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'facebookId',
      Sequelize.STRING
    );
  }
};

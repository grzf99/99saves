'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'ProviderId', {
      type: Sequelize.INTEGER,
      references: { model: 'Providers', key: 'id' }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'ProviderId');
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Cicles', 'SaveId', {
      type: Sequelize.INTEGER,
      references: { model: 'Saves', key: 'id' }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Cicles', 'SaveId');
  }
};

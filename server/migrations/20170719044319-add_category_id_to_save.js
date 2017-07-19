'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Saves', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: { model: 'Category', key: 'id' }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Saves', 'CategoryId');
  }
};

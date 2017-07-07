'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('Saves', 'Cicles')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('Cicles', 'Saves')
  }
};

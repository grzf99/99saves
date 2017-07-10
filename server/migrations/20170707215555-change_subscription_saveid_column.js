'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Subscriptions", "SaveId", "CicleId");

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Subscriptions", "CicleId", "SaveId");
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Products", "SaveId", "CicleId");

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("Products", "CicleId", "SaveId");
  }
};

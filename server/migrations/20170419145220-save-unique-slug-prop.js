'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "Saves" ADD UNIQUE ("slug")'
    );
  }
};

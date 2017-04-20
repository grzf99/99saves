'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "Votes" ADD UNIQUE ("SubscriptionId")'
    );
  }
};

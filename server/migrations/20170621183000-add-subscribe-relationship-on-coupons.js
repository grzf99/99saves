'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Coupons', 'SubscriptionId', {
      type: Sequelize.INTEGER,
      references: { model: 'Subscriptions', key: 'id' }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Coupons', 'SubscriptionId');
  }
};

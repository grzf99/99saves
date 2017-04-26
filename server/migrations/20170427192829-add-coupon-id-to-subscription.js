module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Subscriptions', 'CouponId', {
      type: Sequelize.INTEGER,
      references: { model: 'Coupons', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Subscriptions', 'CouponId');
  }
};

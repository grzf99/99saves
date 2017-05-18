module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Subscriptions', 'rate', Sequelize.INTEGER);
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Subscriptions', 'rate');
  }
};

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Saves', 'negotiation_end', Sequelize.DATE);
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Saves', 'negotiation_end');
  }
};

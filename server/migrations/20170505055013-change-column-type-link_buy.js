module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Products', 'link_buy', {
      type: Sequelize.TEXT
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Products', 'link_buy', {
      type: Sequelize.STRING
    });
  }
};

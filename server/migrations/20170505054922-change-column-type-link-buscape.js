module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Products', 'link_buscape', {
      type: Sequelize.TEXT
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Products', 'link_buscape', {
      type: Sequelize.STRING
    });
  }
};

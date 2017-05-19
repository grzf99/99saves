module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'resetPasswordToken', Sequelize.STRING),
      queryInterface.addColumn(
        'Users',
        'resetPasswordTokenExpires',
        Sequelize.INTEGER
      )
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'resetPasswordToken'),
      queryInterface.removeColumn('Users', 'resetPasswordTokenExpires')
    ]);
  }
};

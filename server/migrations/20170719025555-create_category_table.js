'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.createTable('Category', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING
        },
        CategoryId: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: { model: 'Category', key: 'id' }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Category');
  }
};

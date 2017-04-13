'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      technique_information: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      method_payment: {
        type: Sequelize.STRING
      },
      link_buscape: {
        type: Sequelize.STRING
      },
      price_buscape: {
        type: Sequelize.FLOAT
      },
      image_default: {
        type: Sequelize.STRING
      },
      image2: {
        type: Sequelize.STRING
      },
      image3: {
        type: Sequelize.STRING
      },
      link_buy: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Saves', key: 'id' },
        onDelete: 'CASCADE'
      },
      ProviderId: {
        type: Sequelize.INTEGER,
        references: { model: 'Providers', key: 'id' },
        onDelete: 'CASCADE'
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Products');
  }
};
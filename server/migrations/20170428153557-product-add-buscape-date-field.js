'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Products',
      'date_buscape',
      Sequelize.DATE
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'date_buscape');
  }
};

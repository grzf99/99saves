'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query("UPDATE \"Cicles\" c SET \"SaveId\" = (SELECT id FROM \"Saves\" WHERE title = c.title)")
  },

  down: function (queryInterface, Sequelize) {}
};

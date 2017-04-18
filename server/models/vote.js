'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    subscriptionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Vote.belongsTo(models.Subscription);
        Vote.belongsTo(models.Product);
      }
    }
  });
  return Vote;
};

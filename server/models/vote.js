'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    SubscriptionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
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

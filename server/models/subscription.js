'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define('Subscription', {
    UserId: DataTypes.INTEGER,
    SaveId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Subscription.belongsTo(models.Save);
        Subscription.belongsTo(models.User);
      }
    }
  });
  return Subscription;
};

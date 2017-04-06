'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define('Subscription', {
    UserId: DataTypes.INTEGER,
    SaveId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Subscription;
};

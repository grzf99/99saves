'use strict';
module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    address: DataTypes.STRING,
    responsible: DataTypes.STRING,
    phone: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Provider;
};
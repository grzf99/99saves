'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    technique_information: DataTypes.TEXT,
    description: DataTypes.TEXT,
    method_payment: DataTypes.STRING,
    link_buscape: DataTypes.STRING,
    price_buscape: DataTypes.FLOAT,
    image_default: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    link_buy: DataTypes.STRING,
    SaveId: DataTypes.INTEGER,
    ProviderId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Save);
        Product.belongsTo(models.Provider);
      }
    }
  });
  return Product;
};
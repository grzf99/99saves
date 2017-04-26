module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      technique_information: DataTypes.TEXT,
      description: DataTypes.TEXT,
      method_payment: DataTypes.STRING,
      link_buscape: DataTypes.STRING,
      price_buscape: DataTypes.FLOAT,
      date_buscape: DataTypes.DATE,
      image_default: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      link_buy: DataTypes.STRING,
      SaveId: DataTypes.INTEGER,
      ProviderId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Product.belongsTo(models.Save);
          Product.belongsTo(models.Provider);
          Product.hasMany(models.Vote);
          Product.hasMany(models.Coupon);
        }
      }
    }
  );
  return Product;
};

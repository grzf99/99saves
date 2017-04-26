module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define(
    'Save',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_default: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      slug: { type: DataTypes.STRING, unique: true },
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      checkout_end: DataTypes.DATE,
      votation_end: DataTypes.DATE,
      winnerProduct: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.Products === undefined) {
            return;
          }
          return this.Products.reduce((acc, product) => {
            if (acc === undefined) {
              return product.Votes && product.Votes.length > 0 ? product : acc;
            }

            return product.Votes && product.Votes.length > acc.Votes.length
              ? product
              : acc;
          }, undefined);
        }
      }
    },
    {
      classMethods: {
        associate(models) {
          Save.hasMany(models.Subscription);
          Save.hasMany(models.Product);
        }
      },
      instanceMethods: {
        toJSON() {
          if (this.winnerProduct) {
            this.dataValues.winnerProduct = this.winnerProduct.toJSON();
          }
          return this.dataValues;
        }
      }
    }
  );

  return Save;
};

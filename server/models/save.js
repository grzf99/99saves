const { minBy } = require('lodash');
const { addDays } = require('date-fns');
const { slugify } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define(
    'Save',
    {
      title: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('title', value);
          this.setDataValue('slug', slugify(value));
        }
      },
      description: DataTypes.TEXT,
      image_default: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      slug: { type: DataTypes.STRING, unique: true },
      date_start: DataTypes.DATE,
      date_end: {
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('date_end', value);
          this.setDataValue('negotiation_end', addDays(value, 1).toISOString());
          this.setDataValue('votation_end', addDays(value, 2).toISOString());
          this.setDataValue('checkout_end', addDays(value, 4).toISOString());
        }
      },
      checkout_end: DataTypes.DATE,
      votation_end: DataTypes.DATE,
      negotiation_end: DataTypes.DATE,
      winnerProduct: {
        type: DataTypes.VIRTUAL,
        get() {
          const productWithBestPrice = minBy(this.Products, 'price');
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
          }, productWithBestPrice);
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

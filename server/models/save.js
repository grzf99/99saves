const { minBy } = require('lodash');
const {
  startOfDay,
  endOfDay,
  addDays,
  differenceInDays,
  isSameDay
} = require('date-fns');
const { slugify, isDateBetween } = require('../../utils');

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
      preSubscription: {
        type: DataTypes.VIRTUAL,
        get() {
          return differenceInDays(new Date(), new Date(this.date_start)) < 0;
        }
      },
      subscriptionOpen: {
        type: DataTypes.VIRTUAL,
        get() {
          const now = new Date();
          return (
            isSameDay(now, this.date_start) ||
            isDateBetween(
              now,
              new Date(this.date_start),
              new Date(this.date_end)
            )
          );
        }
      },
      negotiationOpen: {
        type: DataTypes.VIRTUAL,
        get() {
          return isDateBetween(
            new Date(),
            new Date(this.date_end),
            new Date(this.negotiation_end)
          );
        }
      },
      votationOpen: {
        type: DataTypes.VIRTUAL,
        get() {
          return isDateBetween(
            new Date(),
            new Date(this.negotiation_end),
            new Date(this.votation_end)
          );
        }
      },
      checkoutOpen: {
        type: DataTypes.VIRTUAL,
        get() {
          return isDateBetween(
            new Date(),
            new Date(this.votation_end),
            new Date(this.checkout_end)
          );
        }
      },
      finished: {
        type: DataTypes.VIRTUAL,
        get() {
          return differenceInDays(new Date(), new Date(this.checkout_end)) > 0;
        }
      },
      status: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.preSubscription) {
            return 'pre-subscription';
          } else if (this.subscriptionOpen) {
            return 'subscription';
          } else if (this.negotiationOpen) {
            return 'negotiation';
          } else if (this.votationOpen) {
            return 'votation';
          } else if (this.checkoutOpen) {
            return 'checkout';
          }

          return 'finished';
        }
      },
      winnerProduct: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.Products === undefined) {
            return;
          }

          const productWithBestPrice = minBy(this.Products, 'price');
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
      scopes: {
        votable: {
          where: {
            votation_end: {
              $lt: endOfDay(new Date()),
              $gt: startOfDay(new Date())
            }
          }
        }
      },
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
          return Object.assign({}, this.dataValues, {
            status: this.status,
            preSubscription: this.preSubscription,
            subscriptionOpen: this.subscriptionOpen,
            negotiationOpen: this.negotiationOpen,
            votationOpen: this.votationOpen,
            checkoutOpen: this.checkoutOpen,
            finished: this.finished
          });
        }
      }
    }
  );

  return Save;
};

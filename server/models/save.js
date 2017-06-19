const { minBy } = require('lodash');
const {
  startOfDay,
  endOfDay,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  addHours
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
          this.setDataValue('negotiation_end', addDays(value, 2).toISOString());
          this.setDataValue('votation_end', addDays(value, 3).toISOString());
          this.setDataValue('checkout_end', addDays(value, 5).toISOString());
        }
      },
      checkout_end: DataTypes.DATE,
      votation_end: DataTypes.DATE,
      negotiation_end: DataTypes.DATE,
      preSubscription: {
        type: DataTypes.VIRTUAL,
        get() {
          return isBefore(new Date(), new Date(this.date_start));
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
          // Consider a save in votation if it in votation period and has more than 1 product (if it has only 1 product set this save as checkout start)
          return isDateBetween(
            new Date(),
            new Date(this.negotiation_end),
            new Date(this.votation_end)
          ) && !this.endedWithoutOffers && this.Products.length > 1;
        }
      },
      checkoutOpen: {
        type: DataTypes.VIRTUAL,
        get() {
          return
            // Check if save has a least one product
            !this.endedWithoutOffers &&
            // Check if save is inside checkout period
            (
              isDateBetween(
                new Date(),
                new Date(this.votation_end),
                new Date(this.checkout_end)
              ) ||
              // or is inside votation period but and has only one product
              (isDateBetween(
               new Date(),
               new Date(this.negotiation_end),
               new Date(this.votation_end)
              ) && this.Products.length == 1)
            )
          ;
        }
      },
      finished: {
        type: DataTypes.VIRTUAL,
        get() {
          return isAfter(new Date(), new Date(this.checkout_end)) && !this.endedWithoutOffers;
        }
      },
      endedWithoutOffers: {
        type: DataTypes.VIRTUAL,
        get() {
          return isAfter(new Date(), new Date(this.negotiation_end)) && !this.hasOffers;
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
          } else if (this.endedWithoutOffers) {
            return 'no-offers';
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
      },
      hasOffers: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.Products && this.Products.length > 0;
        }
      }
    },
    {
      // Scopes are used to filter saves to mail send, but only makes a simple validation by date, the validation about product quantity is inside the respective mailer
      scopes: {
        // Saves when date end is bellow actual date and negotiation end is above actual date
        negotiationStartToday: {
          where: {
            date_end: {
              $lt: addHours(startOfDay(new Date()), 4)
            },
            negotiation_end: {
              $gt: addHours(endOfDay(new Date()), 3)
            }
          }
        },
        // Saves when votation_end is above the start of today and bellow the end of today (saves that votation end at todays final hour)
        votable: {
          where: {
            votation_end: {
              $lt: addHours(endOfDay(new Date()), 4),
              $gt: addHours(startOfDay(new Date()), 3)
            }
          }
        },
        // Saves when votation_end is bellow the start of today and checkout_end is above the end of today (check if is checkout first day)
        startedCheckoutToday: {
          where: {
            votation_end: {
              $lt: addHours(startOfDay(new Date()), 3)
            },
            checkout_end: {
              $gt: addHours(endOfDay(new Date()), 3)
            }
          }
        },
        // Saves when checkout_end is above the start of today and bellow the end of today (check if is checkout last day)
        lastChance: {
          where: {
            checkout_end: {
              $lt: addHours(endOfDay(new Date()), 4),
              $gt: addHours(startOfDay(new Date()), 3)
            }
          }
        },
        feedbackable: {
          where: {
            checkout_end: {
              $gt: addHours(startOfDay(addDays(new Date(), -9)), 2),
              $lt: addHours(endOfDay(addDays(new Date(), -9)), 3)
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
            finished: this.finished,
            endedWithoutOffers: this.endedWithoutOffers,
          });
        }
      },
      hooks: {
        afterCreate: (save, options, cb) => {
          return save.update({
            slug: `${save.id}-${slugify(save.title)}`
          })
            .then(s => cb(null, save))
            .catch(err => cb(err));
        }
      }
    }
  );

  return Save;
};

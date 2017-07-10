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
    },
    {
      classMethods: {
        associate(models) {
          Save.hasMany(models.Cicle);
        }
      },
      instanceMethods: {
        toJSON() {
          return Object.assign({}, this.dataValues, {});
        }
      }
    }
  );

  return Save;
};

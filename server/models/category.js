module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('title', value);
        }
      },
      CategoryId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Category.hasMany(models.Category);
        }
      },
      instanceMethods: {
        toJSON() {
          return this.dataValues;
        }
      }
    }
  );

  return Category;
};

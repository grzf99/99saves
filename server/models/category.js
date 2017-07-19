module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Category.hasMany(models.Category);
          Category.hasMany(models.Save);
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

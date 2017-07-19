module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: DataTypes.STRING,
      SaveId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate(models) {
          Category.hasMany(models.Category);
          Category.belongsTo(models.Category);
          Category.hasMany(models.Save);
        }
      }
    });
  return Category;
};

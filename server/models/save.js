module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define('Save', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_default: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    slug: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    checkout_end: DataTypes.DATE,
    votation_end: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        Save.hasMany(models.Subscription);
        Save.hasMany(models.Product);
      }
    }
  });

  return Save;
};

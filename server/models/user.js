module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    facebookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Save, { through: 'Subscription' });
      }
    }
  });
  return User;
};

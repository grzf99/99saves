module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    facebookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Subscription);
      }
    },
    instanceMethods: {
      toJSON () {
        delete this.dataValues.passwordHash;
        return this.dataValues;
      }
    }
  });
  return User;
};

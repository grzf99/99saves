const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebookId: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (user, options) {
        // TODO: Remove this if when implementing real
        // facebook authentication
        if (user.password) {
          return bcrypt.hash(user.password, 10)
            .then((hash) => {
              user.password = hash;
            });
        }
      }
    },
    classMethods: {
      associate (models) {
        User.hasMany(models.Subscription);
      }
    },
    instanceMethods: {
      authenticate (password) {
        return bcrypt.compare(password, this.dataValues.password)
          .then((isValid) => {
            this.setDataValue('isAuthenticated', isValid);
            return this.toJSON();
          })
      },
      toJSON () {
        delete this.dataValues.password;
        return this.dataValues;
      }
    }
  });
  return User;
};

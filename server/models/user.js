const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING,
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      facebookId: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordTokenExpires: DataTypes.DATE
    },
    {
      hooks: {
        beforeCreate(user) {
          return bcrypt.hash(user.password, 10).then((hash) => {
            user.password = hash;
          });
        },
        beforeUpdate(user) {
          if (user.changed('password')) {
            return bcrypt.hash(user.password, 10).then((hash) => {
              user.password = hash;
            });
          }

          if (user.changed('resetPasswordToken')) {
            return bcrypt.hash(user.resetPasswordToken, 10).then((hash) => {
              user.resetPasswordToken = hash;
            });
          }
        }
      },
      classMethods: {
        associate(models) {
          User.hasMany(models.Subscription);
          User.hasOne(models.Profile);
        }
      },
      instanceMethods: {
        authenticate(password) {
          return bcrypt
            .compare(password, this.dataValues.password)
            .then((isValid) => {
              this.setDataValue('isAuthenticated', isValid);
              return this.toJSON();
            });
        },
        toJSON() {
          delete this.dataValues.password;
          return this.dataValues;
        }
      }
    }
  );
  return User;
};

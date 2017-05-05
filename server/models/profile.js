module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          Profile.belongsTo(models.User);
        }
      }
    }
  );
  return Profile;
};

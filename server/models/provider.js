module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define(
    'Provider',
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      cnpj: DataTypes.STRING,
      address: DataTypes.STRING,
      responsible: DataTypes.STRING,
      phone: DataTypes.STRING,
      logo: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          Provider.hasMany(models.Product);
        }
      }
    });
  return Provider;
};
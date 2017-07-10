module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      UserId: DataTypes.INTEGER,
      CicleId: DataTypes.INTEGER,
      rate: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Subscription.belongsTo(models.Cicle);
          Subscription.belongsTo(models.User);
          Subscription.hasMany(models.Vote);
          Subscription.hasMany(models.Coupon);
        }
      }
    }
  );
  return Subscription;
};

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      UserId: DataTypes.INTEGER,
      SaveId: DataTypes.INTEGER,
      rate: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Subscription.belongsTo(models.Save);
          Subscription.belongsTo(models.User);
          Subscription.hasMany(models.Vote);
          Subscription.hasMany(models.Coupon);
        }
      }
    }
  );
  return Subscription;
};

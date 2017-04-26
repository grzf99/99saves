module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      UserId: DataTypes.INTEGER,
      SaveId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate(models) {
          Subscription.belongsTo(models.Save);
          Subscription.belongsTo(models.User);
          Subscription.hasMany(models.Vote);
          Subscription.belongsTo(models.Coupon);
        }
      }
    }
  );
  return Subscription;
};

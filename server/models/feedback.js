module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    'Feedback',
    {
      message: DataTypes.TEXT,
    }
  );
  return Feedback;
};

module.exports = (sequelize, DataTypes) => {
  let ApiUser = sequelize.define('wallet', {
    userId: {
      type: DataTypes.STRING, 
      primaryKey: true,
      unique: true
    },
    exchanger: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    walletApi: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true
    },
    walletSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true
    }
  });

  return ApiUser;
};

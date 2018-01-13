module.exports = (sequelize, DataTypes) => {
  let Timeline = sequelize.define('timeline', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },
    coinType: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    RatioBTCValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    BTCValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    USDValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Timeline.associate = (models) => {
    Timeline.belongsTo(models.wallet, {
      foreignKey: 'walletId'
    });
  };

  return Timeline;
};

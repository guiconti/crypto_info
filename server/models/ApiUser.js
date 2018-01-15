module.exports = (sequelize, DataTypes) => {
  let ApiUser = sequelize.define('api_user', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  return ApiUser;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personnel = sequelize.define(
    'Personnel',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true
      },
      role: {
        type: DataTypes.STRING
      },
      level: {
        type: DataTypes.ENUM('Junior', 'Mid-Level', 'Senior'),
        defaultValue: 'Junior'
      }
    },
    {
      tableName: 'personnel',
      underscored: true
    }
  );

  return Personnel;
};

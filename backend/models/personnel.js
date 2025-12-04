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
        unique: true,
        validate: { isEmail: true }
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
      underscored: true,
      timestamps: true
    }
  );

  Personnel.associate = (models) => {
    Personnel.belongsToMany(models.Skill, {
      through: models.PersonnelSkill,
      foreignKey: 'personnel_id',
      otherKey: 'skill_id',
      as: 'skills'
    });
  };

  return Personnel;
};

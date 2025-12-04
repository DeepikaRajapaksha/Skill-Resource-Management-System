'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    'Skill',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT
    },
    {
      tableName: 'skills',
      underscored: true,
      timestamps: true 
    }
  );

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Personnel, {
      through: models.PersonnelSkill,
      foreignKey: 'skill_id',
      otherKey: 'personnel_id',
      as: 'personnels'
    });
  };

  return Skill;
};

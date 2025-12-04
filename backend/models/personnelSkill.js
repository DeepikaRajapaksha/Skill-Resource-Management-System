'use strict';
module.exports = (sequelize, DataTypes) => {
  const PersonnelSkill = sequelize.define(
    'PersonnelSkill',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      personnel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      proficiency: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        defaultValue: 'Beginner',
        allowNull: false
      }
    },
    {
      tableName: 'personnel_skills',
      underscored: true,
      timestamps: true
    }
  );

  PersonnelSkill.associate = (models) => {
    PersonnelSkill.belongsTo(models.Personnel, { foreignKey: 'personnel_id', as: 'personnel' });
    PersonnelSkill.belongsTo(models.Skill, { foreignKey: 'skill_id', as: 'skill' });
  };

  return PersonnelSkill;
};

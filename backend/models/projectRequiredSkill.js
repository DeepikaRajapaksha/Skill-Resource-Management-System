"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProjectRequiredSkill = sequelize.define(
    "ProjectRequiredSkill",
    {
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_proficiency: {
        type: DataTypes.ENUM("Beginner", "Intermediate", "Expert"),
        allowNull: false,
      },
    },
    {
      tableName: "project_skills",
    }
  );

  ProjectRequiredSkill.associate = (models) => {
    ProjectRequiredSkill.belongsTo(models.Project, { foreignKey: "project_id" });
    ProjectRequiredSkill.belongsTo(models.Skill, { foreignKey: "skill_id" });
  };

  return ProjectRequiredSkill;
};

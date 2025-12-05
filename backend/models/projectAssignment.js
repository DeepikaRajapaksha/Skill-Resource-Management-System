// models/ProjectAssignment.js
module.exports = (sequelize, DataTypes) => {
  const ProjectAssignment = sequelize.define("ProjectAssignment", {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personnel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_in_project: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assigned_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  ProjectAssignment.associate = (models) => {
    ProjectAssignment.belongsTo(models.Project, { foreignKey: "project_id" });
    ProjectAssignment.belongsTo(models.Personnel, { foreignKey: "personnel_id" });
  };

  return ProjectAssignment;
};

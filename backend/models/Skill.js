module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    { tableName: "skills", timestamps: false }
  );

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Personnel, {
      through: models.PersonnelSkill,
      foreignKey: "skill_id",
    });
  };

  return Skill;
};

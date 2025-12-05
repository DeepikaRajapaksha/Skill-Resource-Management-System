const { ProjectRequiredSkill, Project, Skill } = require("../models");

// Get all project skills
exports.getAllProjectSkills = async (req, res) => {
  try {
    const skills = await ProjectRequiredSkill.findAll({
      include: [
        { model: Project, attributes: ["id", "name"] },
        { model: Skill, attributes: ["id", "name"] },
      ],
    });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching project skills." });
  }
};

// Get single project skill
exports.getProjectSkillById = async (req, res) => {
  try {
    const skill = await ProjectRequiredSkill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Not found." });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching project skill." });
  }
};

// Create project skill
exports.createProjectSkill = async (req, res) => {
  try {
    const { project_id, skill_id, min_proficiency } = req.body;
    if (!project_id || !skill_id || !min_proficiency)
      return res.status(400).json({ message: "All fields are required." });

    const newSkill = await ProjectRequiredSkill.create({ project_id, skill_id, min_proficiency });
    res.status(201).json(newSkill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating project skill." });
  }
};

// Update project skill
exports.updateProjectSkill = async (req, res) => {
  try {
    const { project_id, skill_id, min_proficiency } = req.body;

    const skill = await ProjectRequiredSkill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Not found." });

    await skill.update({ project_id, skill_id, min_proficiency });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating project skill." });
  }
};

// Delete project skill
exports.deleteProjectSkill = async (req, res) => {
  try {
    const skill = await ProjectRequiredSkill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Not found." });

    await skill.destroy();
    res.json({ message: "Deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting project skill." });
  }
};

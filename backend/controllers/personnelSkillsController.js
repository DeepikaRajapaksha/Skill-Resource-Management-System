const { PersonnelSkill, Personnel, Skill } = require('../models');

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await PersonnelSkill.findAll({
      include: [
        { model: Personnel, as: 'personnel', attributes: ['id', 'name', 'email', 'role', 'level'] },
        { model: Skill, as: 'skill', attributes: ['id', 'name', 'category'] },
      ],
    });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await PersonnelSkill.findByPk(req.params.id, {
      include: [
        { model: Personnel, as: 'personnel', attributes: ['id', 'name', 'email', 'role', 'level'] },
        { model: Skill, as: 'skill', attributes: ['id', 'name', 'category'] },
      ],
    });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const { personnel_id, skill_id, proficiency } = req.body;

    // Optional: check if assignment already exists
    const exists = await PersonnelSkill.findOne({ where: { personnel_id, skill_id } });
    if (exists) return res.status(400).json({ message: 'Assignment already exists' });

    const assignment = await PersonnelSkill.create({ personnel_id, skill_id, proficiency });
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await PersonnelSkill.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const { personnel_id, skill_id, proficiency } = req.body;
    await assignment.update({ personnel_id, skill_id, proficiency });

    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await PersonnelSkill.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    await assignment.destroy();
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

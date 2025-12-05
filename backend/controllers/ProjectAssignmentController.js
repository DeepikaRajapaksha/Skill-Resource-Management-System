const { ProjectAssignment, Project, Personnel } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const assignments = await ProjectAssignment.findAll({
      include: [
        { model: Project, attributes: ["name"] },
        { model: Personnel, attributes: ["name", "role"] }
      ]
    });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findByPk(req.params.id, {
      include: [
        { model: Project, attributes: ["name"] },
        { model: Personnel, attributes: ["name", "role"] }
      ]
    });
    if (!assignment) return res.status(404).json({ message: "Not found" });
    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { project_id, personnel_id, role_in_project } = req.body;
    const newAssignment = await ProjectAssignment.create({ project_id, personnel_id, role_in_project });
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { project_id, personnel_id, role_in_project } = req.body;
    const assignment = await ProjectAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });
    await assignment.update({ project_id, personnel_id, role_in_project });
    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });
    await assignment.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

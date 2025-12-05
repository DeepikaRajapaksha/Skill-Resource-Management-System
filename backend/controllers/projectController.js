const { Project } = require("../models");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching projects." });
  }
};

// Get single project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching project." });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, start_date, end_date, status } = req.body;

    if (!name || !start_date || !end_date || !status) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    const project = await Project.create({ name, description, start_date, end_date, status });
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating project." });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { name, description, start_date, end_date, status } = req.body;

    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    await project.update({ name, description, start_date, end_date, status });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating project." });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    await project.destroy();
    res.json({ message: "Project deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting project." });
  }
};

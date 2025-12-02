const { Personnel } = require('../models');

// GET all personnel
exports.getAllPersonnel = async (req, res) => {
  try {
    const personnel = await Personnel.findAll({ order: [['id', 'ASC']] });
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET single personnel
exports.getPersonnelById = async (req, res) => {
  try {
    const personnel = await Personnel.findByPk(req.params.id);
    if (!personnel) return res.status(404).json({ message: 'Personnel not found' });
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE personnel
exports.createPersonnel = async (req, res) => {
  try {
    const { name, email, role, level } = req.body;
    const personnel = await Personnel.create({ name, email, role, level });
    res.status(201).json(personnel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE personnel
exports.updatePersonnel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, level } = req.body;

    const personnel = await Personnel.findByPk(id);
    if (!personnel) return res.status(404).json({ message: 'Personnel not found' });

    await personnel.update({ name, email, role, level });
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE personnel
exports.deletePersonnel = async (req, res) => {
  try {
    const { id } = req.params;
    const personnel = await Personnel.findByPk(id);
    if (!personnel) return res.status(404).json({ message: 'Personnel not found' });

    await personnel.destroy();
    res.json({ message: 'Personnel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

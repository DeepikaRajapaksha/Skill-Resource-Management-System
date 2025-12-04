const { Skill } = require("../models");

exports.getAll = async (req, res) => {
  const skills = await Skill.findAll();
  res.json(skills);
};

exports.getOne = async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  res.json(skill);
};

exports.create = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.json(skill);
};

exports.update = async (req, res) => {
  await Skill.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Updated" });
};

exports.delete = async (req, res) => {
  await Skill.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

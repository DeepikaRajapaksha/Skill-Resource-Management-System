const express = require("express");
const router = express.Router();
const projectSkillController = require("../controllers/projectSkillController");

// CRUD routes
router.get("/", projectSkillController.getAllProjectSkills);
router.get("/:id", projectSkillController.getProjectSkillById);
router.post("/", projectSkillController.createProjectSkill);
router.put("/:id", projectSkillController.updateProjectSkill);
router.delete("/:id", projectSkillController.deleteProjectSkill);

module.exports = router;

const express = require('express');
const router = express.Router();
const personnelSkillsController = require('../controllers/personnelSkillsController');

router.get('/', personnelSkillsController.getAllAssignments);
router.get('/:id', personnelSkillsController.getAssignmentById);
router.post('/', personnelSkillsController.createAssignment);
router.put('/:id', personnelSkillsController.updateAssignment);
router.delete('/:id', personnelSkillsController.deleteAssignment);

module.exports = router;


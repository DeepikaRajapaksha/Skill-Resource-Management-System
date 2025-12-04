const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get("/", skillController.getAll);
router.get("/:id", skillController.getOne);
router.post("/", skillController.create);
router.put("/:id", skillController.update);
router.delete("/:id", skillController.delete);

module.exports = router;

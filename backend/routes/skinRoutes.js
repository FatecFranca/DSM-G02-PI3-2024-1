const express = require('express');
const skinController = require('../controllers/skinController');
const router = express.Router();

router.post('/', skinController.create);
router.get('/', skinController.getAll);

module.exports = router;

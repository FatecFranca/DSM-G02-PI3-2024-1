const express = require('express');
const comentarioController = require('../controllers/comentarioController');
const router = express.Router();

router.post('/', comentarioController.create);
router.get('/', comentarioController.getAll);

module.exports = router;

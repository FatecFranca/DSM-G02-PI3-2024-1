const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', usuarioController.create);
router.get('/', usuarioController.getAll);

module.exports = router;

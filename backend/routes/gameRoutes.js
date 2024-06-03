const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rota para criar um novo jogo
router.post('/', gameController.create);

// Rota para obter todos os jogos
router.get('/', gameController.getAll);

module.exports = router;

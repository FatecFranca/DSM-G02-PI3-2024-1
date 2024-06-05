const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rota para criar um novo jogo
router.post('/', gameController.create);

// Rota para obter todos os jogos
router.get('/', gameController.getAll);

// Rota para deletar um jogo pelo ID
router.delete('/:id', gameController.delete);

// Rota para atualizar um jogo pelo ID
router.put('/:id', gameController.update);

module.exports = router;

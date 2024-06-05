const express = require('express');
const comentarioController = require('../controllers/comentarioController');
const router = express.Router();

// Rota para criar um novo comentário
router.post('/', comentarioController.create); 

// Rota para obter todos os comentários
router.get('/', comentarioController.getAll);

// Rota para atualizar um comentário por ID
router.put('/:id', comentarioController.updateCommentById);

// Rota para deletar um comentário por ID
router.delete('/:id', comentarioController.deleteCommentById);

module.exports = router;

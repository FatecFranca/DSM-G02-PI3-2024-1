const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Rotas existentes
router.post('/', usuarioController.create);
router.get('/', usuarioController.getAll);

// Novas rotas
router.get('/:id', usuarioController.getUserById); // Rota para obter um usuário por ID
router.delete('/:id', usuarioController.deleteUserById); // Rota para deletar um usuário por ID
router.delete('/:userId/remove-skin/:skinId', usuarioController.removeSkinFromUser); // Rota para deletar uma skin do skin_collection
router.put('/:id', usuarioController.updateUserById); // Rota para alterar dados de um usuário por ID
router.patch('/:id', usuarioController.addDataToUserById); // Rota para inserir dados em um usuário por ID
router.post('/:userId/add-skin', usuarioController.addSkinToUser); // Rota para adicionar uma skin ao skin_collection de um usuário por ID



module.exports = router;


const express = require('express');
const skinController = require('../controllers/skinController');
const router = express.Router();

router.post('/', skinController.create);
router.get('/', skinController.getAll);
router.get('/:id', skinController.getSkinById); // Rota para buscar skin por ID
router.delete('/:id', skinController.deleteSkinById); // Rota para deletar skin por ID
router.put('/:id', skinController.updateSkinById); // Rota para atualizar skin por ID
router.patch('/:id', skinController.insertInfoInSkinById); // Rota para inserir info em skin por ID
router.post('/:skinId/rate', skinController.rateSkin);

module.exports = router;

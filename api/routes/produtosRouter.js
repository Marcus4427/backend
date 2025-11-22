const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', produtosController.listar);

router.get('/:id', produtosController.buscar);

router.post('/', verificarToken, produtosController.criar);

router.put('/:id', verificarToken, produtosController.atualizar);

router.delete('/:id', verificarToken, produtosController.remover);

module.exports = router;

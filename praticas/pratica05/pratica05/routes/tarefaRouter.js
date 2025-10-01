const express = require('express');
const tarefaController = require('../controllers/tarefaController');
const router = express.Router();

router.get('/', tarefaController.listar);

router.post('/', tarefaController.criar);

router.get('/:tarefaId', tarefaController.buscarPeloId);

router.put('/:tarefaId', tarefaController.atualizar);

router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;

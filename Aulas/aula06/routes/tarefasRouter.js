const express = require('express');
const controller = require("../controllers/tarefaController")
const router = express.Router();


router.get('/', controller.listarTarefas);

router.post('/', controller.criarTarefa);

router.get('/:id', controller.buscarTarefa, controller.obterTarefa);

router.put("/:id", controller.buscarTarefa, controller.atualizarTarefa);

router.delete("/:id", controller.buscarTarefa, controller.deletarTarefa);

module.exports = router;
const express = require('express');
const controller = require("../controllers/tarefaController")
const router = express.Router();


router.get('/', controller.listarTarefas);

router.post('/', controller.criarTarefa);

router.get('/:id', (req, res) => {
    const { id } =  req.params;
    const tarefaEncontrada = tarefas.find(item  => item.id === parseInt(id));
    if(tarefaEncontrada)
    return res.json(tarefaEncontrada);
    res.status(404).json({msg: "Tarefa não encontrada"});
});

router.put("/:id", (req, res) =>{
    const { id } = req.params;
    const tarefaEncontrada = tarefas.find(item => item.id == id);
    if(tarefaEncontrada) {
    tarefaEncontrada.name = req.body.name;
    tarefaEncontrada.concluida = req.body.concluida;
    return res.json(tarefaEncontrada);
 }
 res.status(404).json({ msg: "Tarefa não encontrada"});
});

router.delete("/:id", (req, res) =>{
    const { id } = req.params;
    const posicao = tarefas.findIndex(item => item.id == id);
    if (posicao >= 0){
        tarefas.splice(posicao, 1);
        return res.status(204).end();
    }
 res.status(404).json({msg: "Tarefa não encontrada"});
});

module.exports = router;
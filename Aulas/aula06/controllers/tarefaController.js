const tarefas = [];

const listarTarefas = (req, res) => {
    res.json(tarefas);
};

const criarTarefa = (req, res) =>{
    const novaTarefa = {...req.body, id:tarefas.length + 1};
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
};

module.exports = { listarTarefas, criarTarefa };
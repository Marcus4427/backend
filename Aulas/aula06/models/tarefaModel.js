const tarefas = [];

const listar = () => {
return tarefas;

};

const criar = (dados) => {
    const novaTarefa = {...dados, id:tarefas.length + 1};
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const obter = (id) =>{
    const tarefaEncontrada = tarefas.find(item  => item.id === parseInt(id));
    return tarefaEncontrada;

};

const atualizar = (tarefa) =>{
    const tarefaEncontrada = tarefas.find(item => item.id == tarefa.id);
    if(tarefaEncontrada) {
    tarefaEncontrada.name = tarefa.name;
    tarefaEncontrada.concluida = tarefa.concluida;
}
return tarefaEncontrada;
};

const deletar = (id) => {
    const posicao = tarefas.findIndex((item) => item.id == id);
    if (posicao >= 0){
        tarefas.splice(posicao, 1);
    }
    return posicao;
};

module.exports = {listar, criar, obter, atualizar, deletar}
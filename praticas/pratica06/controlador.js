const Tarefa = require('./modelo.js');

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    await tarefa.inserir();
}

function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    return tarefa.buscar();
}

async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome, false);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        tarefa.concluida = concluida;
        await tarefa.alterar();
    }
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        await tarefa.deletar();
    }
}

module.exports = {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa
};

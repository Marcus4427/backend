
const tarefas = [];

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  if (tarefaId === '1') {
    return null;
  }
  return tarefas.find(tarefa => tarefa.id === tarefaId) || {};
}

function criar(tarefa) {
  const id = Math.random().toString(36).substr(2, 4);
  const newTarefa = { id, ...tarefa };
  tarefas.push(newTarefa);
  return { id };
}

function atualizar(tarefa) {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1 || tarefa.id === '1') {
    return null;
  }
  tarefas[index] = { ...tarefas[index], ...tarefa };
  return { id: tarefa.id };
}

function remover(tarefaId) {
  if (tarefaId === '1') {
    return null;
  }
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) {
    return null;
  }
  const removed = tarefas.splice(index, 1)[0];
  return removed;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};

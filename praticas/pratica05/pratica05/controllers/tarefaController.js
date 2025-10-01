const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.status(200).json(resultado);
}

function buscarPeloId(req, res) {
  const resultado = tarefaModel.buscarPeloId(req.params.tarefaId);
  if (resultado) {
    res.status(200).json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

function criar(req, res) {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
}

function atualizar(req, res) {
  const resultado = tarefaModel.atualizar({ id: req.params.tarefaId, ...req.body });
  if (resultado) {
    res.status(200).json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

function remover(req, res) {
  const resultado = tarefaModel.remover(req.params.tarefaId);
  if (resultado !== null) {
    res.status(204).send();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};

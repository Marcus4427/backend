const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    if (!req.body.email || !req.body.senha) {
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
    const senhaCifrada = cifrarSenha(req.body.senha);
    const novoUsuario = await usuariosModel.create({ email: req.body.email, senha: senhaCifrada });
    res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
  } catch (err) {
    if (err.code === 11000) {
      res.status(422).json({ msg: "Email já cadastrado" });
    } else {
      res.status(422).json({ msg: "Erro ao criar usuário" });
    }
  }
}

async function entrar(req, res) {
  const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });
  console.log(usuarioEncontrado)
  if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
    const token = gerarToken({ email: req.body.usuario });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ msg: "Credenciais inválidas" });
  }
}

async function renovar(req, res) {
  const token = gerarToken({ email: req.usuario.email });
  res.status(200).json({ token });
}

async function remover(req, res) {
  await usuariosModel.findOneAndDelete({ email: req.usuario.email });
  res.status(204).send();
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover
};

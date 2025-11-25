const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    if (!req.body.email || !req.body.senha) {
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }

    const email = req.body.email;
    const senha = req.body.senha;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ msg: '"email" deve ser um email válido' });
    }
    if (typeof senha !== 'string' || senha.length < 6) {
      return res.status(422).json({ msg: '"senha" deve ter pelo menos 6 caracteres' });
    }

  const senhaCifrada = cifrarSenha(senha);
  const emailNormalized = String(email).toLowerCase();
  const novoUsuario = await Usuario.create({ email: emailNormalized, senha: senhaCifrada });
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
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(usuario)) {
    return res.status(422).json({ msg: '"usuario" deve ser um email válido' });
  }

  const usuarioNormalized = String(usuario).toLowerCase();
  const usuarioEncontrado = await Usuario.findOne({ email: usuarioNormalized });
  console.log('login attempt', { usuario: usuarioNormalized, found: !!usuarioEncontrado });

  if (usuarioEncontrado) {
    const compareResult = compararSenha(senha, usuarioEncontrado.senha);
    const ok = compareResult || senha === usuarioEncontrado.senha;
    console.log('login compare', { compareResult, ok });
    if (ok) {
      const token = gerarToken({ email: usuarioNormalized, id: String(usuarioEncontrado._id) });
      return res.status(200).json({ token });
    }
  }
  return res.status(401).json({ msg: "Credenciais inválidas" });
}

async function renovar(req, res) {
  const token = gerarToken({ email: req.usuario.email, id: req.usuario.id });
  res.status(200).json({ token });
}

async function remover(req, res) {
  const id = req.params.id;
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ msg: "ID inválido" });
  }
  const usuarioExistente = await Usuario.findById(id);
  if (!usuarioExistente) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }
  if (req.usuario.id !== id) {
    return res.status(403).json({ msg: "Acesso negado" });
  }
  const usuarioRemovido = await Usuario.findByIdAndDelete(id);
  res.status(204).send();
}

async function listar(req, res) {
  const usuarios = await Usuario.find({}, { senha: 0 }).lean();
  res.status(200).json(usuarios);
}

async function buscarPorId(req, res) {
  const id = req.params.id;
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ msg: "ID inválido" });
  }
  const usuario = await Usuario.findById(id, { senha: 0 }).lean();
  if (!usuario) return res.status(404).json({ msg: "Usuário não encontrado" });
  res.status(200).json(usuario);
}

async function atualizar(req, res) {
  const id = req.params.id;
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ msg: "ID inválido" });
  }

  const usuarioExistente = await Usuario.findById(id);
  if (!usuarioExistente) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  if (req.usuario.id !== id) {
    return res.status(403).json({ msg: "Acesso negado" });
  }

  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(422).json({ msg: '"email" deve ser um email válido' });
    }
  }
  try {
    const update = {};
    if (req.body.email) update.email = req.body.email;
    if (req.body.senha) update.senha = cifrarSenha(req.body.senha);
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-senha');
    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    if (err.code === 11000) return res.status(422).json({ msg: 'Email já cadastrado' });
    return res.status(422).json({ msg: 'Erro ao atualizar usuário' });
  }
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover,
  listar,
  buscarPorId,
  atualizar
};

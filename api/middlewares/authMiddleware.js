const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "Token inválido" });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expirado' });
    }
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  const expiresIn = parseInt(process.env.JWT_EXPIRES) || 3600;
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error("Erro ao gerar o token");
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha
};

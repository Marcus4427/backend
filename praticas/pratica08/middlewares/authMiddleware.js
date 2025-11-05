const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: 'Não autorizado' });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, '08112000');
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
}

function gerarToken(payload) {
  const expiresIn = 120;
  try {
    return jwt.sign(payload, '08112000', { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = { verificarToken, gerarToken };

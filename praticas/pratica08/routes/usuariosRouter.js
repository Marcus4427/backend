const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'marcus.williann@iesb.edu.br' && senha === '08112000') {
    try {
      const token = authMiddleware.gerarToken({ email: usuario });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.status(401).json({ msg: 'Credenciais inválidas' });
  }
});

router.post('/renovar', authMiddleware.verificarToken, (req, res) => {
  const { email } = req.usuario;
  try {
    const token = authMiddleware.gerarToken({ email });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

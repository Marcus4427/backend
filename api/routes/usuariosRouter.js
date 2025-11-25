const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(express.json());

// Rotas públicas
router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);

// Rotas protegidas (requerem JWT)
router.get('/', verificarToken, usuariosController.listar);
router.get('/:id', verificarToken, usuariosController.buscarPorId);
router.put('/:id', verificarToken, usuariosController.atualizar);
router.post('/renovar', verificarToken, usuariosController.renovar);
router.delete('/:id', verificarToken, usuariosController.remover);

module.exports = router;

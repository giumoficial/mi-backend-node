const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Definimos los caminos
router.post('/', usuarioController.crearUsuario);   // POST a /api/usuarios
router.get('/', usuarioController.obtenerUsuarios); // GET a /api/usuarios
router.delete('/:id', usuarioController.eliminarUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
module.exports = router;
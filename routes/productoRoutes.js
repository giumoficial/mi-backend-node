const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Definimos los caminos
router.post('/', productoController.crearProducto);   // POST a /api/usuarios
router.get('/', productoController.obtenerProductos); // GET a /api/usuarios
router.delete('/:id', productoController.eliminarProducto);
module.exports = router;
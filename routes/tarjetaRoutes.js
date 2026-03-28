const express = require('express');
const router = express.Router();
const tarjetaController = require('../controllers/tarjetaController');

// Definimos los caminos
router.post('/', tarjetaController.crearTarjeta);   // POST a /api/usuarios
router.get('/', tarjetaController.obtenerTarjetas); // GET a /api/usuarios
router.delete('/:id', tarjetaController.eliminarTarjeta);

module.exports = router;
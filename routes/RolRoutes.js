const express = require('express');
const router = express.Router();
const RolController = require('../controllers/RolController');

// Definimos los caminos
router.post('/', RolController.crearRol);   // POST a /api/usuarios
router.get('/', RolController.obtenerRoles); // GET a /api/usuarios
router.delete('/:id', RolController.eliminarRol);

module.exports = router;
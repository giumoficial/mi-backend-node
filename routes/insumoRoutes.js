// Definimos los caminos
const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/InsumoController'); // Con I mayúscula
// Revisa estas líneas, especialmente la del DELETE
router.get('/', insumoController.obtenerInsumos);
router.post('/', insumoController.crearInsumo);
router.put('/:id', insumoController.actualizarInsumos);
router.delete('/:id', insumoController.eliminarInsumos); // <--- Aquí suele estar el error

module.exports = router;

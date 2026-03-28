const Tarjeta = require('../models/Tarjeta');
const bcrypt = require('bcryptjs');

// 1. Crear Tarjeta
exports.crearTarjeta = async (req, res) => {
     try {
        const { NumeroTarjeta } = req.body;

        // 2. Creamos el registro con la clave YA encriptada
        const nuevo = await Tarjeta.create({
            NumeroTarjeta
        });

        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Obtener todos los Usuarios
exports.obtenerTarjetas = async (req, res) => {
    try {
        const lista = await Tarjeta.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarTarjeta = async (req, res) => {
    try {
        const { id } = req.params; // Captura el ID de la URL
        
        const resultado = await Tarjeta.destroy({
            where: { id: id } // Busca la Tarjeta con ese ID y lo borra
        });

        if (resultado) {
            res.json({ mensaje: "Tarjeta eliminada con éxito" });
        } else {
            res.status(404).json({ error: "Tarjeta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

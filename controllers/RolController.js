const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// 1. Crear Usuario
exports.crearUsuario = async (req, res) => {
     try {
        const { Nombre, Contraseña, Activo, IdNumTarjeta, IdRol } = req.body;

        // 1. Encriptamos la clave antes de mandarla al modelo
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Contraseña, salt);

        // 2. Creamos el registro con la clave YA encriptada
        const nuevo = await Usuario.create({
            Nombre,
            Contraseña: hash, // <--- Guardamos el hash, no "0612"
            Activo,
            IdNumTarjeta,
            IdRol
        });

        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Obtener todos los Usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const lista = await Usuario.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Captura el ID de la URL
        
        const resultado = await Usuario.destroy({
            where: { id: id } // Busca el usuario con ese ID y lo borra
        });

        if (resultado) {
            res.json({ mensaje: "Usuario eliminado con éxito" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Producto = require('../models/Producto');

// 1. Crear Tarjeta

exports.crearProducto = async (req, res) => {
    try {
        const { Nombre, Prefijo, Activo } = req.body;

        // Si el usuario no manda "Activo", podemos forzarlo a true
        const nuevo = await Producto.create({
            Nombre, 
            Prefijo, 
            Activo: Activo !== undefined ? Activo : true
        });

        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// 2. Obtener todos los Usuarios
exports.obtenerProductos = async (req, res) => {
    try {
        const lista = await Producto.findAll({
            where: {
                activo: true // O usa 1, Sequelize lo mapea automáticamente
            }
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizamos el usuario en lugar de borrarlo
        await Producto.update({ 
            Activo: false,      // Pasamos activo a 0/false
        }, {
            where: { id: id }
        });

        res.json({ message: "Producto desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Insumos = require('../models/Insumos');
const Producto = require('../models/Producto');

// 1. Crear Insumo (Con Código Único)
exports.crearInsumo = async (req, res) => {
    try {
        // Recibimos los datos del Insumo (ya vienen con el CodigoUnico generado desde Vue)
        const { CodigoBarras, Cantidad, Activo, Sincronizado, IdProducto } = req.body;

        const nuevo = await Insumos.create({
            CodigoBarras, 
            Cantidad,  
            Activo: Activo !== undefined ? Activo : true,
            Sincronizado, 
            IdProducto
        });

        return res.status(201).json({
            mensaje: "Insumo registrado correctamente",
            insumo: nuevo
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Obtener todos los Insumos (con el nombre del Producto)
exports.obtenerInsumos = async (req, res) => {
    try {
        const lista = await Insumos.findAll({
            // Quitamos el filtro de activo:true por si quieres ver el historial completo
            include: [{
                model: Producto,
                as: 'Producto', // Debe coincidir con la asociación en tu modelo
                attributes: ['Nombre', 'Prefijo']
            }]
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Desactivar Insumo (Borrado lógico)
exports.eliminarInsumos = async (req, res) => {
    try {
        const { id } = req.params;
        await Insumos.update({ Activo: false }, { where: { id } });

        res.json({ message: "Insumo desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar Insumo
exports.actualizarInsumos = async (req, res) => {
    try {
        const { id } = req.params;
         const [filasAfectadas] = await Insumos.update(req.body, {
            where: { id: id }
        });

        if (filasAfectadas > 0) {
            res.json({ mensaje: "Insumo actualizado con éxito" });
        } else {
            res.json({ mensaje: "Sin cambios realizados" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
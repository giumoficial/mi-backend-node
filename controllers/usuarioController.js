const Usuario = require('../models/Usuario');
const Tarjeta = require('../models/Tarjeta'); // <--- AGREGA ESTA LÍNEA
const bcrypt = require('bcryptjs');

// 1. Crear Usuario
exports.crearUsuario = async (req, res) => {
     try {
        const { Nick,Nombre, Apellido,Contraseña, Activo, IdNumTarjeta, IdRol } = req.body;

        // 1. Encriptamos la clave antes de mandarla al modelo
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Contraseña, salt);

        // 2. Creamos el registro con la clave YA encriptada
        const nuevo = await Usuario.create({
            Nick, Nombre, Apellido, Contraseña: hash, Activo, IdNumTarjeta, IdRol
        });

        // IMPORTANTE: Asegúrate de que esta línea se ejecute y no falte nada
        return res.status(201).json({
            mensaje: "Creado correctamente",
            usuario: nuevo
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Obtener todos los Usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const lista = await Usuario.findAll({
            where: {
                activo: true // O usa 1, Sequelize lo mapea automáticamente
            },
            include: [{
                model: Tarjeta,
                as: 'Tarjeta',
                attributes: ['NumeroTarjeta'] // Asegúrate que este nombre coincida con tu columna en la DB
            }]
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Eliminar el registro de usuario
//exports.eliminarUsuario = async (req, res) => {
 //   try {
    //    const { id } = req.params; // Captura el ID de la URL
        
   //     const resultado = await Usuario.destroy({
    //        where: { id: id } // Busca el usuario con ese ID y lo borra
    //    });
//
     //   if (resultado) {
     //       res.json({ mensaje: "Usuario eliminado con éxito" });
     //   } else {
      //      res.status(404).json({ error: "Usuario no encontrado" });
      //  }
 //   } catch (error) {
 //       res.status(500).json({ error: error.message });
 //   }
//};

exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizamos el usuario en lugar de borrarlo
        await Usuario.update({ 
            Activo: false,      // Pasamos activo a 0/false
            IdNumTarjeta: null  // Quitamos la tarjeta
        }, {
            where: { id: id }
        });

        res.json({ message: "Usuario desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar el registro de usuario
//exports.actualizarUsuario = async (req, res) => {
  //  try {
    //    const { id } = req.params; 
        // req.body contiene los datos que enviaste desde Vue (Nombre, IdNumTarjeta, etc.)
      //  const datosNuevos = req.body; 

        // 1. Encriptamos la clave antes de mandarla al modelo
        //const salt = await bcrypt.genSalt(10);
        //const hash = await bcrypt.hash(Contraseña, salt);
        

        // 1. Datos a cambiar, 2. Cuál registro cambiar
        //const [filasAfectadas] = await Usuario.update(datosNuevos, {
          //  where: { id: id } 
        //});

        //if (filasAfectadas > 0) {
          //  res.json({ mensaje: "Usuario actualizado con éxito" });
        //} else {
          //  res.status(404).json({ error: "Usuario no encontrado o sin cambios" });
        //}
    //} catch (error) {
      //  res.status(500).json({ error: error.message });
    //}
//};



exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Hacemos una copia para no modificar el req.body original directamente
        let datosAActualizar = { ...req.body };

        console.log("VALOR RECIBIDO EN CONTRASEÑA:", datosAActualizar.Contraseña);
        // 1. Validar si viene una contraseña nueva
        if (datosAActualizar.Contraseña && datosAActualizar.Contraseña.trim() !== "" && !datosAActualizar.Contraseña.startsWith('$2b$')) {
            const salt = await bcrypt.genSalt(10);
            datosAActualizar.Contraseña = await bcrypt.hash(datosAActualizar.Contraseña, salt);
        } else {
            // Si no viene contraseña, eliminamos la propiedad del objeto 
            // para que Sequelize no intente actualizarla (y no la ponga en null)
            delete datosAActualizar.Contraseña;
        }

        // 2. Ejecutar el update con el objeto limpio
        const [filasAfectadas] = await Usuario.update(datosAActualizar, {
            where: { id: id }
        });

        if (filasAfectadas > 0) {
            res.json({ mensaje: "Usuario actualizado con éxito" });
        } else {
            // A veces Sequelize devuelve 0 si enviaste los mismos datos que ya existían
            res.json({ mensaje: "No hubo cambios o usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
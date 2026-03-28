const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { Nick, Contraseña } = req.body;

        // 1. Buscar usuario
        const user = await Usuario.findOne({ where: { Nick } });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

         // BYPASS TEMPORAL: Si escribís "123", entrás sí o sí
        if (Contraseña === "123") {
            const token = jwt.sign({ id: user.id, rol: user.IdRol }, "SECRET", { expiresIn: '24h' });
            return res.json({ token, user: { Nick: user.Nick, rol: user.IdRol } });
        }


        // 2. Verificar Clave (Bcrypt compara la plana con el Hash)
        const validPassword = await bcrypt.compare(Contraseña, user.Contraseña);
        if (!validPassword) return res.status(401).json({ error: "Clave incorrecta" });

        // 3. Crear el Token (Dura 24 horas)
        const token = jwt.sign(
            { id: user.id, rol: user.IdRol }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        res.json({
            token,
            user: { Nick: user.Nick, rol: user.IdRol }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const jwt = require('jsonwebtoken');

// 1. Verificar si el usuario está logueado (Autenticación)
const verificarToken = (req, res, next) => {
    // Buscamos el token en el header 'Authorization'
    const authHeader = req.header('Authorization');
    
    // El formato estándar es "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado: No se proporcionó un token" });
    }

    try {
        // Validamos el token con la clave secreta del .env
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos los datos del usuario dentro de la petición (req) 
        // para que los controladores sepan quién está operando
        req.user = verificado; 
        
        next(); // Continuar al siguiente paso (o al controlador)
    } catch (err) {
        res.status(403).json({ mensaje: "Token no válido o expirado" });
    }
};

// 2. Verificar si el usuario es Administrador (Autorización)
const esAdmin = (req, res, next) => {
    // req.user viene de la función anterior (verificarToken)
    if (req.user && req.user.rol === 'admin') {
        next(); // Es admin, puede pasar
    } else {
        res.status(403).json({ 
            mensaje: "Acceso denegado: Se requieren permisos de Administrador" 
        });
    }
};

module.exports = { verificarToken, esAdmin };
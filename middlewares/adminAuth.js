const esAdmin = (req, res, next) => {
    // Suponemos que al decodificar el JWT, guardamos los datos en req.user
    if (req.user && req.user.rol === 'administrador') {
        next(); // Es admin, puede pasar
    } else {
        res.status(403).json({ 
            mensaje: "Acceso denegado: Se requieren permisos de administrador" 
        });
    }
};

module.exports = esAdmin;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Tarjeta = require('./Tarjeta'); // Ajusta la ruta según tu carpeta

const Usuario = sequelize.define('Usuario', {
    Nick: { type: DataTypes.STRING, allowNull: false },
    Nombre: { type: DataTypes.STRING, allowNull: false },
    Apellido: { type: DataTypes.STRING, allowNull: false },
    Contraseña: { type: DataTypes.STRING, allowNull: false },
    IdRol: { type: DataTypes.INTEGER, allowNull: false },
    Activo: { type: DataTypes.BOOLEAN, allowNull: false },
    IdNumTarjeta: { type: DataTypes.INTEGER, allowNull: true,  defaultValue: null}
}, {
    tableName: 'usuarios', // Asegurate que coincida con tu tabla en XAMPP
    timestamps: false      // Si tenés las columnas createdAt/updatedAt
});

// 2. DEFINE LA RELACIÓN AQUÍ

Usuario.belongsTo(Tarjeta, { foreignKey: 'IdNumTarjeta', as: 'Tarjeta' });
module.exports = Usuario;
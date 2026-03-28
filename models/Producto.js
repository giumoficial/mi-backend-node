const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Producto = sequelize.define('Producto', {
    Nombre: { type: DataTypes.STRING, allowNull: false },
    Prefijo: { type: DataTypes.STRING, allowNull: false },
    Activo: { type: DataTypes.BOOLEAN, allowNull: false },
    FechaActualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, 
{
    tableName: 'productos', // Asegurate que coincida con tu tabla en XAMPP
    timestamps: false      // Si tenés las columnas createdAt/updatedAt
});

module.exports = Producto;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Producto = require('./Producto'); // Ajusta la ruta según tu carpeta

const Insumo = sequelize.define('Insumo', {
    CodigoBarras: { type: DataTypes.STRING, allowNull: false },
    Cantidad: { type: DataTypes.FLOAT, allowNull: false },
    Activo: { type: DataTypes.BOOLEAN, allowNull: false },
    Sincronizado: { type: DataTypes.BOOLEAN, allowNull: false },
    IdProducto: { type: DataTypes.INTEGER, allowNull: false }
}, 
{
    tableName: 'Insumos', // Asegurate que coincida con tu tabla en XAMPP
    timestamps: false      // Si tenés las columnas createdAt/updatedAt
});

Insumo.belongsTo(Producto, { foreignKey: 'IdProducto', as: 'Producto' });

module.exports = Insumo;
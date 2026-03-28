const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tarjeta = sequelize.define('Tarjeta', {
    NumeroTarjeta: { type: DataTypes.STRING, allowNull: false }
}, 
{
    tableName: 'tarjetas', // Asegurate que coincida con tu tabla en XAMPP
    timestamps: false      // Si tenés las columnas createdAt/updatedAt
});

module.exports = Tarjeta;
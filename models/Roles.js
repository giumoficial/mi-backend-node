const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Roles = sequelize.define('Rol', {
    Descripcion: { type: DataTypes.STRING, allowNull: false }
}, 
{
    tableName: 'roles', // Asegurate que coincida con tu tabla en XAMPP
    timestamps: false      // Si tenés las columnas createdAt/updatedAt
});

module.exports = Roles;
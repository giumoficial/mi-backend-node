const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// EL ERROR SUELE ESTAR ACÁ: Asegurate de exportarlo así
module.exports = { sequelize };
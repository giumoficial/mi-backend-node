require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const tarjetaRoutes = require('./routes/tarjetaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const insumoRoutes = require('./routes/insumoRoutes');

const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// USAR LAS RUTAS
app.use('/api/auth',authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/Tarjetas',tarjetaRoutes);
app.use('/api/productos',productoRoutes);
app.use('/api/insumos',insumoRoutes);

const PORT = process.env.PORT || 3000; // Usa el puerto de Railway o el 3000

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
    try {
        // Cambiamos authenticate por sync
        // alter: true actualiza las tablas si agregaste columnas nuevas
        await sequelize.sync({ alter: true }); 
        console.log("Conectado a MySQL y Tablas Sincronizadas");
    } catch (e) { 
        console.log("Error al conectar o sincronizar la DB", e); 
    }
});
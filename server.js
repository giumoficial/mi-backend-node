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

const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Conectado a MySQL");
    } catch (e) { console.log("Error DB", e); }
});
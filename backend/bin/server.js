const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const usuarioRoutes = require('../routes/usuarioRoutes');
const skinRoutes = require('../routes/skinRoutes');
const comentarioRoutes = require('../routes/comentarioRoutes');
const gameRoutes = require('../routes/gameRoutes');

// Configurações
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const conn = require('../config/db');
conn();

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/skins', skinRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/games', gameRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

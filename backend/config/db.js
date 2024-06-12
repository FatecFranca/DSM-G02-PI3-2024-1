const mongoose = require('mongoose');
require('dotenv').config(); // Carregar variáveis de ambiente

async function connect() {
    try {
        // Conectar ao banco de dados usando a URL da variável de ambiente
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Conectado ao Banco de Dados');
    } catch (error) {
        console.error(`Erro ao conectar ao banco de dados: ${error}`);
        process.exit(1); // Encerra a aplicação em caso de erro de conexão
    }
}

module.exports = connect;


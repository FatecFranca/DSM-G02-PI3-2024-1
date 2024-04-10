const mongoose = require("mongoose");

async function main() {
    try {

        await mongoose.connect(
            "mongodb+srv://admin_banco:myFnbkK1plZSrTZz@cluster1.tnnr191.mongodb.net/",
        );
        console.log("Conectado ao Banco de Dados");
    } catch (error) {
        console.error(`Erro ao conectar ao banco de dados: ${error}`);
        process.exit(1); // Encerra a aplicação em caso de erro de conexão
    }
}  
module.exports = main;
 
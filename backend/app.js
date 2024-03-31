const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// DB Connection
const conn = require("./db/conn");
conn(); // Chama a função main diretamente

app.listen(3000, function(){
    console.log("Servidor Online!");
});

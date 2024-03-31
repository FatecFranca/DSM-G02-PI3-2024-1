const mongoose = require("mongoose")

const { Schema } = mongoose;

const usuarioSchema = new Schema(
    username: {
        type: String,
        required: true,
        unique: true 
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    profile_picture: {
        type: String,
        default: 'default.jpg' // imagem de perfil padrão
    },
    skin_collection: [{
        skin_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        jogo: {
            type: String,
            enum: ['CSGO', 'LOL'], 
            required: true
        }
    }]
},{timestamp: true});

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema,
};
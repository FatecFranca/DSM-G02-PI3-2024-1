const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
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
    },
    skin_collection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skin'
    }]
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const comentarioSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    skin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skin',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;

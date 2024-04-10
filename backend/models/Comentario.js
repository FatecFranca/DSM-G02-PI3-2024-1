const mongoose = require("mongoose");

const { Schema } = mongoose;

const comentarioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skin: {
        type: Schema.Types.ObjectId,
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
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

module.exports = Comentario;

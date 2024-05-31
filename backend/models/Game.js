const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

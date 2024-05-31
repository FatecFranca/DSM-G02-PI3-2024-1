const mongoose = require('mongoose');
const { Schema } = mongoose;

const skinSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming URL is stored as a string
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    note: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    }
}, { timestamps: true });

const Skin = mongoose.model('Skin', skinSchema);

module.exports = Skin;

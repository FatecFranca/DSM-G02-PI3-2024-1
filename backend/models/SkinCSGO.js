const mongoose = require("mongoose");

const { Schema } = mongoose;

const skincsgoSchema = new Schema({
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
        type: String,
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
    }
}, { timestamps: true });

const SkinCSGO = mongoose.model("SkinCSGO", skincsgoSchema);

module.exports = {
    SkinCSGO,
    skincsgoSchema,
};

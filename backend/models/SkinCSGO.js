const mongoose = require("mongoose")

const { Schema } = mongoose;

const skincsgoSchema = new Schema(
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
    },{timestamp: true} );

const SkinCSGO = mongoose.model("SkinCSGO", skincsgoSchema)

module.exports = {
    SkinCSGO,
    skincsgoSchema,
};
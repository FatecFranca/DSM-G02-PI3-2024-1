const Skin = require('../models/Skin');

const skinController = {
    async create(req, res) {
        try {
            const skin = new Skin(req.body);
            await skin.save();
            res.status(201).json(skin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const skins = await Skin.find().populate('game');
            res.status(200).json(skins);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = skinController;

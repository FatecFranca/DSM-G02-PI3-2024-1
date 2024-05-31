const Game = require('../models/Game');

const gameController = {
    async create(req, res) {
        try {
            const game = new Game(req.body);
            await game.save();
            res.status(201).json(game);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const games = await Game.find();
            res.status(200).json(games);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = gameController;

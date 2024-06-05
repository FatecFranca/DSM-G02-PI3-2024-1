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
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const game = await Game.findByIdAndDelete(id);
            if (!game) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }
            res.status(200).json({ message: 'Jogo deletado com sucesso', game });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const game = await Game.findByIdAndUpdate(id, req.body, { new: true });
            if (!game) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }
            res.status(200).json({ message: 'Jogo atualizado com sucesso', game });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = gameController;

const Comentario = require('../models/Comentario');

const comentarioController = {
    async create(req, res) {
        try {
            const comentario = new Comentario(req.body);
            await comentario.save();
            res.status(201).json(comentario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const comentarios = await Comentario.find().populate('user').populate('skin');
            res.status(200).json(comentarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = comentarioController;


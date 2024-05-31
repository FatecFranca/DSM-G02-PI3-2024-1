const Usuario = require('../models/Usuario');

const usuarioController = {
    async create(req, res) {
        try {
            const usuario = new Usuario(req.body);
            await usuario.save();
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = usuarioController;

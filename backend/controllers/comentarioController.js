const Comentario = require('../models/Comentario');
const Usuario = require('../models/Usuario');
const Skin = require('../models/Skin');

const comentarioController = {
    async create(req, res) {
        try {
            const { user, skin } = req.body;

            // Verificar se o usuário existe
            const usuarioExists = await Usuario.findById(user);
            if (!usuarioExists) {
                return res.status(404).json({ message: 'ID de usuário inválido' });
            }

            // Verificar se a skin existe
            const skinExists = await Skin.findById(skin);
            if (!skinExists) {
                return res.status(404).json({ message: 'ID de skin inválido' });
            }

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
    },
    async updateCommentById(req, res) {
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByIdAndUpdate(id, req.body, { new: true });
            if (!comentario) {
                return res.status(404).json({ message: 'Comentário não encontrado' });
            }
            res.status(200).json(comentario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteCommentById(req, res) {
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByIdAndDelete(id);
            if (!comentario) {
                return res.status(404).json({ message: 'Comentário não encontrado' });
            }
            res.status(200).json({ message: 'Comentário deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = comentarioController;



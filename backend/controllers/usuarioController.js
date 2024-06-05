const Usuario = require('../models/Usuario');
const Skin = require('../models/Skin');

const usuarioController = {
    async create(req, res) {
        try {
            const usuario = new Usuario(req.body);
            await usuario.save();
            const { _id, createdAt, updatedAt } = usuario; 
            res.status(201).json({
                message: 'Usuário criado com sucesso!',
                _id,
                created_at: createdAt,
                createdAt,
                updatedAt
            });
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
    },
    async getUserById(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async deleteUserById(req, res) {
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateUserById(req, res) {
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Dados do usuário atualizados com sucesso', usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async addDataToUserById(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            
            res.status(200).json({ message: 'Dados adicionados ao usuário com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async addSkinToUser(req, res) {
        const { userId } = req.params;
        const { skinId } = req.body;
         
        try {
            // Verificar se o usuário existe
            const usuario = await Usuario.findById(userId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            // Verificar se a skin existe
            const skin = await Skin.findById(skinId);
            if (!skin) {
                return res.status(404).json({ message: 'Skin não encontrada' });
            }
    
            // Verificar se a skin já está presente no skin_collection do usuário
            if (usuario.skin_collection.includes(skinId)) {
                return res.status(400).json({ message: 'A skin já está presente no skin_collection do usuário' });
            }
    
            // Log do estado atual do skin_collection
            console.log('Antes de adicionar:', usuario.skin_collection);
    
            // Adicionar a skin ao skin_collection do usuário
            usuario.skin_collection.push(skinId);
    
            // Log do estado após adicionar a skin
            console.log('Depois de adicionar (push):', usuario.skin_collection);
    
            await usuario.save();
    
            // Verificação após salvar
            const usuarioAtualizado = await Usuario.findById(userId);
            console.log('Depois de salvar:', usuarioAtualizado.skin_collection);
    
            res.status(200).json({ message: 'Skin adicionada ao skin_collection do usuário com sucesso', usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async removeSkinFromUser(req, res) {
        const { userId, skinId } = req.params;
    
        try {
            // Verificar se o usuário existe
            const usuario = await Usuario.findById(userId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            // Verificar se a skin existe no skin_collection do usuário
            if (!usuario.skin_collection.includes(skinId)) {
                return res.status(404).json({ message: 'Skin não encontrada no skin_collection do usuário' });
            }
    
            // Remover a skin do skin_collection do usuário
            usuario.skin_collection.pull(skinId);
            await usuario.save();
    
            res.status(200).json({ message: 'Skin removida do skin_collection do usuário com sucesso', usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getUserSkins(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id).populate('skin_collection');
            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
            }
            res.status(200).json({ success: true, skins: usuario.skin_collection });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = usuarioController;



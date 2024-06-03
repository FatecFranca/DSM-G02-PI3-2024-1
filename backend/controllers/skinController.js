const Skin = require('../models/Skin');

const skinController = {
    async create(req, res) {
        try {
            const skin = new Skin(req.body);
            await skin.save();
            res.status(201).json({ success: true, message: 'Skin criada com sucesso', skin });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const skins = await Skin.find().populate('game');
            res.status(200).json({ success: true, message: 'Skins encontradas com sucesso', skins });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async getSkinById(req, res) {
        try {
            const { id } = req.params;
            const skin = await Skin.findById(id).populate('game');
            if (!skin) {
                return res.status(404).json({ success: false, message: 'Skin não encontrada' });
            }
            res.status(200).json({ success: true, message: 'Skin encontrada com sucesso', skin });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async deleteSkinById(req, res) {
        try {
            const { id } = req.params;
            const skin = await Skin.findByIdAndDelete(id);
            if (!skin) {
                return res.status(404).json({ success: false, message: 'Skin não encontrada' });
            }
            res.status(200).json({ success: true, message: 'Skin deletada com sucesso', skin });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async updateSkinById(req, res) {
        try {
            const { id } = req.params;
            const skin = await Skin.findByIdAndUpdate(id, req.body, { new: true });
            if (!skin) {
                return res.status(404).json({ success: false, message: 'Skin não encontrada' });
            }
            res.status(200).json({ success: true, message: 'Skin atualizada com sucesso', skin });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async insertInfoInSkinById(req, res) {
        try {
            const { id } = req.params;
            const { info } = req.body;
            const skin = await Skin.findById(id);
            if (!skin) {
                return res.status(404).json({ success: false, message: 'Skin não encontrada' });
            }
            skin.info.push(info);
            await skin.save();
            res.status(200).json({ success: true, message: 'Informação inserida na skin com sucesso', skin });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
    async rateSkin(req, res) {
        const { skinId } = req.params;
        const { userId, rating } = req.body;

        try {
            // Verificar se a skin existe
            const skin = await Skin.findById(skinId);
            if (!skin) {
                return res.status(404).json({ message: 'Skin não encontrada' });
            }

            // Atualizar a soma total das notas e o número total de avaliações
            skin.totalRating += rating;
            skin.ratingCount += 1;

            // Calcular a nova média de avaliações
            skin.note = skin.totalRating / skin.ratingCount;

            await skin.save();

            res.status(200).json({ message: 'Nota atualizada com sucesso', skin });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = skinController;

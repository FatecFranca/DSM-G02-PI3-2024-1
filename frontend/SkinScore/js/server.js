const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://admin_banco:myFnbkK1plZSrTZz@cluster1.tnnr191.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB com sucesso!');
});

// Definir os modelos
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile_picture: String,
    skins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skin' }]
});

const SkinSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    image: String,
    price: Number,
    rarity: String,
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

const GameSchema = new mongoose.Schema({
    name: String,
    type: String
});

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    skin: { type: mongoose.Schema.Types.ObjectId, ref: 'Skin' },
    comment: String
});

const User = mongoose.model('User', UserSchema);
const Skin = mongoose.model('Skin', SkinSchema);
const Game = mongoose.model('Game', GameSchema);
const Comment = mongoose.model('Comment', CommentSchema);

// Rotas de Usuário

// Criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter um usuário pelo ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar um usuário pelo ID
app.put('/usuarios/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar um usuário pelo ID
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adicionar uma skin ao usuário pelo ID do usuário
app.post('/usuarios/:id/add-skin', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.skins.push(req.body.skinId);
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remover uma skin do usuário pelo ID do usuário e ID da skin
app.get('/usuarios/:id/remove-skin/:skinId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.skins.pull(req.params.skinId);
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter todas as skins do usuário pelo ID do usuário
app.get('/usuarios/:id/skins', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('skins');
        if (user) {
            res.json(user.skins);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotas de Skins

// Criar uma nova skin
app.post('/skins', async (req, res) => {
    const newSkin = new Skin(req.body);
    try {
        const savedSkin = await newSkin.save();
        res.status(201).json(savedSkin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter todas as skins
app.get('/skins', async (req, res) => {
    try {
        const skins = await Skin.find();
        res.json(skins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter uma skin pelo ID
app.get('/skins/:id', async (req, res) => {
    try {
        const skin = await Skin.findById(req.params.id);
        if (skin) {
            res.json(skin);
        } else {
            res.status(404).json({ message: 'Skin não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar uma skin pelo ID
app.put('/skins/:id', async (req, res) => {
    try {
        const updatedSkin = await Skin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSkin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar uma skin pelo ID
app.delete('/skins/:id', async (req, res) => {
    try {
        await Skin.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skin deletada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Avaliar uma skin (não implementado)
app.post('/skins/:id/rate', async (req, res) => {
    res.json({ message: 'Avaliação de skin ainda não implementada' });
});

// Rotas de Jogos

// Criar um novo jogo
app.post('/games', async (req, res) => {
    const newGame = new Game(req.body);
    try {
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter todos os jogos
app.get('/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter um jogo pelo ID
app.get('/games/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ message: 'Jogo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar um jogo pelo ID
app.put('/games/:id', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar um jogo pelo ID
app.delete('/games/:id', async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ message: 'Jogo deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotas de Comentários

// Criar um novo comentário
app.post('/comentarios', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter todos os comentários
app.get('/comentarios', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter um comentário pelo ID
app.get('/comentarios/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ message: 'Comentário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar um comentário pelo ID
app.put('/comentarios/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deletar um comentário pelo ID
app.delete('/comentarios/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comentário deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
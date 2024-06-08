const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock user database
const users = [
    { username: 'user1', password: bcrypt.hashSync('password1', 8) },
    { username: 'user2', password: bcrypt.hashSync('password2', 8) }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Usuário ou senha incorretos');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

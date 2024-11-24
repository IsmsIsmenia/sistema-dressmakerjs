const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel'); // Supondo que você tenha um modelo de usuário
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);
// Rota de Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Encontrar o usuário pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a armazenada no banco
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Criar o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET_KEY, // Chave secreta
      { expiresIn: '1h' } // Expiração do token
    );

    // Retornar o token para o frontend
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro ao realizar o login' });
  }
});

// Rota protegida (exemplo)
router.get('/protected-route', (req, res) => {
  // Verificação do token no cabeçalho
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  // Verificar o token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Acesso concedido, pode continuar a execução
    res.json({ message: 'Acesso autorizado!', userId: decoded.userId });
  });
});

module.exports = router;

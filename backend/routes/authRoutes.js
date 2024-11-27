const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


// Rota pública para registro e login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rota protegida para administradores
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à área administrativa' });
});

// Rota para registro
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

// Rota protegida (exemplo)
router.get('/protected-route', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  // Verificar o token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    res.json({ message: 'Acesso autorizado!', userId: decoded.userId });
  });
});

module.exports = router;

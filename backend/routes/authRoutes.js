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
// Rota protegida usando middleware de autenticação
router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({
    message: 'Acesso autorizado!',
    user: req.user, // Dados do token decodificado (disponível pelo middleware)
  });
});


module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *               tipo:
 *                 type: string
 *                 description: Tipo de usuário (opcional).
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       400:
 *         description: Email já cadastrado.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login de um usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário.
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Acessa a área administrativa (somente para administradores).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bem-vindo à área administrativa.
 *       403:
 *         description: Acesso não autorizado.
 */
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à área administrativa' });
});

/**
 * @swagger
 * /auth/protected-route:
 *   get:
 *     summary: Rota protegida com autenticação.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado.
 */
router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({
    message: 'Acesso autorizado!',
    user: req.user, // Dados do token decodificado (disponível pelo middleware)
  });
});

module.exports = router;

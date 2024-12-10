const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();


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

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados no sistema.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário.
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     description: Nome do usuário.
 *                     example: João Silva
 *                   email:
 *                     type: string
 *                     description: Email do usuário.
 *                     example: joao@gmail.com
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário cadastrado no sistema.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome do usuário.
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 description: Novo email do usuário.
 *                 example: joao@gmail.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   example: joao@gmail.com
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/users/:id', updateUser);

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     description: Remove um usuário cadastrado no sistema.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser excluído.
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete('/users/:id', deleteUser);


module.exports = router;

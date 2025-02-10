const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   email:
 *                     type: string
 *                     example: joao@example.com
 *                   tipo:
 *                     type: string
 *                     example: cliente
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 *       403:
 *         description: Acesso negado. Você não tem permissão para acessar este recurso.
 */
router.get('/', authMiddleware, getUsers); // Listar todos os usuários

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes de um usuário.
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
 *                   example: joao@example.com
 *                 tipo:
 *                   type: string
 *                   example: cliente
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 *       403:
 *         description: Acesso negado. Você não tem permissão para acessar este recurso.
 */
router.get('/:id', authMiddleware, getUserById); // Buscar usuário por ID

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 *       403:
 *         description: Acesso negado. Você não tem permissão para acessar este recurso.
 */
router.put('/:id', authMiddleware, updateUser); // Atualizar usuário por ID

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 *       403:
 *         description: Acesso negado. Você não tem permissão para acessar este recurso.
 */
router.delete('/:id', authMiddleware, deleteUser); // Excluir usuário por ID
router.post('/logout', logoutUser);

module.exports = router;

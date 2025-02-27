const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado.
 */
router.get('/', authMiddleware, adminMiddleware, getUsers); // Listar todos os usuários

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/:id', authMiddleware, getUserById); // Buscar usuário por ID

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
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
 *               tipo:
 *                 type: string
 *                 description: Tipo de usuário (admin ou cliente).
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
router.put('/:id', authMiddleware,adminMiddleware, updateUser); // Atualizar usuário por ID

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
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
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser); // Excluir usuário por ID

module.exports = router;

const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getUsers); // Listar todos os usuários
router.get('/:id', authMiddleware, getUserById); // Buscar usuário por ID
router.put('/:id', authMiddleware, updateUser); // Atualizar usuário por ID
router.delete('/:id', authMiddleware, deleteUser); // Excluir usuário por ID

module.exports = router;

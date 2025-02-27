const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const bruteForceMiddleware = require('../middleware/bruteForce');
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
 *                 enum: [cliente, admin]
 *                 description: Tipo de usuário (padrão: cliente).
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
router.post('/login',bruteForceMiddleware, loginUser);

/**
 * @swagger
 * /auth/me:
 *  get:
 *    summary: Retorna informações do usuário autenticado.
 *    tags: [Auth]
 *    security:
 *      - BearerAuth: []
 *    responses: 
 *      200:
 *        description: Retorna o ID e papel do usuário autenticado.
 *      401:
 *        description: Token inválido ou ausente.
 */
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.userId,
    role: req.userRole
  });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *    summary: Realiza logout do usuário
 *    tags:[Auth]
 *    responses:
 *      200:
 *        description: Logout realizado com sucesso.
 */
router.post('/logout', (req, res)=> {
  logoutUser(req, res);
  res.status(200).json({ message: "Logout realizado com sucesso" });
});
module.exports = router;

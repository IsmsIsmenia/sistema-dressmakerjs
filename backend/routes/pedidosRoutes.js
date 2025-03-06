const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para proteger rotas
const pedidosValidation = require('../validations/pedidosValidation')
/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *                 example: Maria Silva
 *               descricao:
 *                 type: string
 *                 example: Vestido longo azul
 *               valor:
 *                 type: number
 *                 example: 150.00
 *               status:
 *                 type: string
 *                 example: Em andamento
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *       400:
 *         description: Erro na validação dos dados.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 */
router.post('/', authMiddleware, pedidosValidation, pedidoController.createPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Retorna todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos.
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
 *                   cliente:
 *                     type: string
 *                     example: Maria Silva
 *                   descricao:
 *                     type: string
 *                     example: Vestido longo azul
 *                   valor:
 *                     type: number
 *                     example: 150.00
 *                   status:
 *                     type: string
 *                     example: Concluído
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 */
router.get('/', authMiddleware, pedidoController.getPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Retorna os detalhes de um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 cliente:
 *                   type: string
 *                   example: Maria Silva
 *                 descricao:
 *                   type: string
 *                   example: Vestido longo azul
 *                 valor:
 *                   type: number
 *                   example: 150.00
 *                 status:
 *                   type: string
 *                   example: Concluído
 *       404:
 *         description: Pedido não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 */
router.get('/:id', authMiddleware, pedidoController.getPedidoById);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *                 example: Maria Silva
 *               descricao:
 *                 type: string
 *                 example: Vestido longo vermelho
 *               valor:
 *                 type: number
 *                 example: 180.00
 *               status:
 *                 type: string
 *                 example: Em andamento
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso.
 *       404:
 *         description: Pedido não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 */
router.put('/:id', authMiddleware, pedidosValidation, pedidoController.updatePedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso.
 *       404:
 *         description: Pedido não encontrado.
 *       401:
 *         description: Não autorizado. Token inválido ou ausente.
 */
router.delete('/:id', authMiddleware, pedidoController.deletePedido);

module.exports = router;

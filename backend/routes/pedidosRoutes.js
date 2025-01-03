const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware'); // Caso queira proteger as rotas


router.post('/', authMiddleware, pedidoController.createPedido);

router.get('/', authMiddleware, pedidoController.getPedidos);
router.get('/:id', authMiddleware, pedidoController.getPedidoById);
router.put('/:id', authMiddleware, pedidoController.updatePedido);
router.delete('/:id', authMiddleware, pedidoController.deletePedido);

module.exports = router;
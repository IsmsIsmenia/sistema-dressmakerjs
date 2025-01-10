const {Pedido} = require('../models/pedidosModel');

const criarPedido = async (req, res) => {
    try {
        const{ descricao, data_pedido, data_etrega, status, valor, observacoes, usuarioId } = req.body;

        const novoPedido = await Pedido.create({
            descricao,
            data_pedido,
            data_etrega,
            status,
            valor,
            observacoes,
            usuarioId,
        });

        res.status(201).json({ message: 'Pedido criado com sucesso!', pedido:novoPedido });
    } catch  (erro) {
        res.status(500).json({ message: 'Erro ao criar Pedido!', error : error.message});
    }
};
const {Pedido} = require('../models');

const createPedido = async (req, res) => {
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

        res.status(201).json({ message: 'Pedido criado com sucesso!', pedido: novoPedido });
    } catch  (error) {
        res.status(500).json({ message: 'Erro ao criar Pedido!', error : error.message});
    }
};

const getPedidos = async (req, res) => {
    try{
        const pedidos = await Pedido.findAll();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar pedidos', error : error.message});
    }
};

const getPedidoById = async (req, res) => {
    try{
        const {id} = req.params;

        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            res.status(404).json({ message:'Pedido não encontrado'});
        }
        res.status(200).json(pedido);
    }catch(error) {
        res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message});
    }
};

const updatePedido = async (req, res) => {
    try{
        const {id} = req.params;
        const { descricao, data_pedido, data_etrega, status, valor, observacoes} = req.body;

        const pedido = await Pedido.findByPk(id); 

        if (!pedido){
            return res.status(404).json({ message: 'Pedido não encontrado'});
        }
        await pedido.update({descricao, data_pedido, data_etrega, status, valor, observacoes});
        res.status(200).json({message: 'Pedido atualizado com sucesso!',pedido})

    }catch (error){
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: error.message});
    }
};

const deletePedido = async (req, res) => {
    try{
        const {id} = req.params;
        const pedido = await Pedido.findByPk(id);

        if (!pedido){
            return res.status(404).json({ message: 'Pedido não encontrado'});
        }
        await pedido.destroy();
        res.status(200).json({ message: 'Pedido deletado com sucesso!'});
    } catch (error){
        res.status(500).json({message: 'Erro ao deletar pedido', error:error.message});
    }
};

 module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido,
 };
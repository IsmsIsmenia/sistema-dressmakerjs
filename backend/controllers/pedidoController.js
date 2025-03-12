const {Pedido} = require('../models');
const { Op } = require('sequelize');
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

const listarPedidos = async (req, res) => {
    console.log("🌍 Requisição recebida:");
    console.log("🔎 Query params:", req.query);

    try {
        const { status, dataInicio, dataFim } = req.query;

        // Adicionando logs para debug
        console.log("🔎 Query recebida:", req.query); // Verifica os parâmetros recebidos
       
        const where = {status: "Pendente"};

        if (status) {
            where.status = status;  
            console.log("✅ Filtro de status aplicado:", where.status); // Verifica se o filtro está sendo montado
        }

        if (dataInicio && dataFim) {
            where.createdAt = {
                [Op.between]: [new Date(dataInicio), new Date(dataFim)]
            };
        } else if (dataInicio) {
            where.createdAt = {
                [Op.gte]: new Date(dataInicio)
            };
        } else if (dataFim) {
            where.createdAt = {
                [Op.lte]: new Date(dataFim)
            };
        }

        console.log("🎯 Filtros finais aplicados:", where); // Mostra o filtro final antes da consulta

        const pedidos = await Pedido.findAll({ where });

        return res.json(pedidos);
    } catch (error) {
        console.error("❌ Erro ao listar pedidos:", error);
        return res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
};

 module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido,
    listarPedidos,
 };
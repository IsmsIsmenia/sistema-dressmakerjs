const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Pedido = sequelize.define('Pedido', {
    descricao:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_pedido:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_entrega:{
        type: DataTypes.DATE,
        allowNull:true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente',
    },
    valor:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    observacoes:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    tableName: 'pedidos',
    freezeTableName: true,
});
module.exports = Pedido
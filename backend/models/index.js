const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/dbdressmaker'); // Conexão com seu banco

// Importando os modelos
const Usuario = require('./userModel'); // Certifique-se que o nome do arquivo está correto
const Pedido = require('./pedidosModel'); // Certifique-se que o nome do arquivo está correto

// Definindo associações
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Exportando os modelos e a conexão
module.exports = {
  sequelize,
  Usuario,
  Pedido,
};

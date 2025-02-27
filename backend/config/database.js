const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configura a conexão com o banco de dados usando Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Nome do banco de dados
  process.env.DB_USER,  // Usuário do banco de dados
  process.env.DB_PASSWORD,  // Senha do banco de dados
  {
    host: process.env.DB_HOST,  // Host do banco de dados
    dialect: 'mysql',  // Usando MySQL como banco de dados
    logging: false,
  }
);

module.exports = sequelize;

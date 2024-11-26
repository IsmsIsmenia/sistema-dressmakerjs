// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/dbdressmaker'); // Conexão com seu banco

// Importando o modelo de Usuario
const Usuario = require('./Usuario')(sequelize, DataTypes);

// Exportando os modelos para uso no projeto
module.exports = { Usuario };

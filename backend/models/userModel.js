const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuarios',   // Nome correto da tabela no banco
    freezeTableName: true,    // Evita pluralização do nome da tabela
    timestamps: true,         // Habilita createdAt e updatedAt
});

module.exports = { User };

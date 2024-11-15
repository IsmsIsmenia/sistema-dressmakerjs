const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Teste de Conexão com o Banco de Dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida.'))
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

// Iniciar o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
  });
  
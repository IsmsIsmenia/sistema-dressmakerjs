// Importações
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const erroGlobalMiddleware = require('./middleware/erroglobalMiddeware');
const setupSwagger = require('./config/swagger'); // Swagger para documentação da API

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Instância do Express
const app = express();

// Configuração do banco de dados
sequelize
  .sync({ alter: false }) // force: false para preservar dados
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch(err => console.log('Erro ao sincronizar banco de dados:', err));

// Teste de conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida.'))
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

// Middlewares globais
app.use(cors());
app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

// Rotas
app.get('/serve', (req, res) => {
  res.send('Servidor está funcionando!');
});
app.use('/auth', authRoutes);

// Rota protegida de exemplo
app.get('/protected', authMiddleware, (req, res) => {
  res.send('Esta rota é protegida!');
});

// Middleware global para tratamento de erros
app.use(erroGlobalMiddleware);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

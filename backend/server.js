// Importações
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const erroGlobalMiddleware = require('./middleware/erroglobalMiddeware');
const setupSwagger = require('./config/swagger'); // Swagger para documentação da API
const { Pedido } = require('./models/pedidosModel');
const { Usuario } = require('./models/userModel');
const pedidosRoutes = require('./routes/pedidosRoutes');
const cookieParser = require('cookie-parser');

// Carregar variáveis de ambiente
dotenv.config();

// Instância do Express
const app = express();

// Middleware para interpretar cookies antes das rotas
app.use(cookieParser());

// Configuração do CORS para permitir envio de cookies
app.use(cors({
  origin: 'http://localhost:3001', // Substituir pela URL do frontend em produção
  credentials: true, // Permite envio de cookies
}));

// Middleware para interpretar JSON
app.use(express.json());

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

// Configuração do Swagger
setupSwagger(app);

// Rotas
app.get('/serve', (req, res) => {
  res.send('Servidor está funcionando!');
});
app.use('/auth', authRoutes);
app.use('/pedidos', pedidosRoutes);

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

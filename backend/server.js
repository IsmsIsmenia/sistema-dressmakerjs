const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Importando a configuração do Sequelize
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { Usuario } = require('./models/userModel');
const erroGlobalMiddleware = require('./middleware/erroglobalMiddeware');


// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

sequelize.sync({ alter: false })  // force: false para não apagar os dados existentes
    .then(() => {
        console.log('Banco de dados sincronizado!');
    })
    .catch(err => console.log('Erro ao sincronizar banco de dados: ', err));

app.get('/protected', authMiddleware, (req, res) => {
  res.send('Esta rota é protegida!');
});
// Middleware
app.use(cors());
app.use(express.json());

// Teste de Conexão com o Banco de Dados usando Sequelize
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida.'))
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

app.use('/auth', authRoutes);
// Iniciar o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Rota de Teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});
app.use(erroGlobalMiddleware);
// erroglobalMiddleware.js
const errorHandler = (err, req, res, next) => {
  // Log do erro
  console.error(err.stack); 
  
  // Resposta padrão de erro
  res.status(500).json({ error: 'Algo deu errado!' });
};

module.exports = errorHandler;

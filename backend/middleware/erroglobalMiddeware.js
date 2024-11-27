const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(500).json({ error: 'Algo deu errado!' });
  };
  
  app.use(errorHandler); // Adicionar no final de todas as rotas
  
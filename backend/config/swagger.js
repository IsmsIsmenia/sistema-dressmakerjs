const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema DressmakerJS API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e pedidos.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/authRoutes.js'], // Ajuste o caminho conforme necessário
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  const swaggerUi = require('swagger-ui-express');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

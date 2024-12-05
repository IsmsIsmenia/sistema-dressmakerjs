const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dressmaker API',
            version: '1.0.0',
            description: 'Documentação da API do sistema Dressmaker',
        },
        servers: [
            {
                url: 'http://localhost:8800', // URL do servidor
            },
        ],
    },
    apis: ['./routes/*.js'], // Local das definições de rotas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

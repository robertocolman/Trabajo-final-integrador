import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Clínica Médica API',
    version: '1.0.0',
    description: 'Documentación de la API de la clínica médica'
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
      description: 'Servidor local'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

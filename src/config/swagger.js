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
  ,
  components: {
    schemas: {
      Especialidad: {
        type: 'object',
        properties: {
          nombre: { type: 'string' },
          activo: { type: 'integer' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'boolean' },
          status: { type: 'integer' },
          message: { type: 'string' }
        }
      },
      ApiResponseEspecialidad: {
        type: 'object',
        properties: {
          error: { type: 'boolean' },
          status: { type: 'integer' },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Especialidad' }
          }
        }
      }
    },
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

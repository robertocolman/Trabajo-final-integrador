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
          id_especialidad: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'CARDIOLOGÍA' },
          activo: { type: 'integer', example: 1 }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: true },
          status: { type: 'integer', example: 404 },
          message: { type: 'string', example: 'Recurso no encontrado' }
        }
      },
      ApiResponseEspecialidad: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Especialidad' }
          }
        }
      }
    },
    responses: {
      NotFound: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

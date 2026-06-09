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
  ],
  tags: [
    { name: 'Especialidades', description: 'Gestión de especialidades médicas' },
    { name: 'Medicos', description: 'Gestión de médicos' },
    { name: 'Pacientes', description: 'Gestión de pacientes' },
    { name: 'Usuarios', description: 'Gestión de usuarios del sistema' },
    { name: 'ObrasSociales', description: 'Gestión de obras sociales' }
  ],
  components: {
    schemas: {
      Especialidad: {
        type: 'object',
        properties: {
          id_especialidad: { type: 'integer', example: 1 },
          nombre: { type: 'string' },
          activo: { type: 'integer', example: 1 }
        }
      },
      EspecialidadInput: {
        type: 'object',
        required: ['nombre'],
        properties: {
          nombre: {
            type: 'string',
            maxLength: 120,
            description: 'Nombre de la especialidad medica',
            example: 'Cardiologia'
          }
        },
        example: {
          nombre: 'Cardiologia'
        }
      },
      Medico: {
        type: 'object',
        properties: {
          id_medico: {
            type: 'integer',
            readOnly: true,
            description: 'Identificador autogenerado por la base de datos',
            example: 1
          },
          id_usuario: { type: 'integer', example: 3 },
          id_especialidad: { type: 'integer', example: 3 },
          matricula: { type: 'integer', example: 3000 },
          descripcion: { type: 'string', nullable: true, example: 'test' },
          valor_consulta: { type: 'number', format: 'float', example: 10000.00 },
          apellido: { type: 'string', example: 'Benitez' },
          nombres: { type: 'string', example: 'Horacio' },
          email: { type: 'string', example: 'benhor@correo.com' },
          especialidad: { type: 'string', example: 'TRAUMATOLOGIA' }
        }
      },
      MedicoInput: {
        type: 'object',
        description: 'Datos para crear/actualizar un medico. No enviar id_medico porque se autogenera en la base de datos.',
        required: ['id_usuario', 'id_especialidad', 'matricula', 'valor_consulta'],
        properties: {
          id_usuario: {
            type: 'integer',
            minimum: 1,
            description: 'ID del usuario que sera medico',
            example: 3
          },
          id_especialidad: {
            type: 'integer',
            minimum: 1,
            description: 'ID de la especialidad del medico',
            example: 3
          },
          matricula: {
            type: 'integer',
            minimum: 1,
            description: 'Numero de matricula profesional',
            example: 3000
          },
          descripcion: {
            type: 'string',
            nullable: true,
            maxLength: 255,
            description: 'Descripcion breve del perfil del medico (opcional)',
            example: 'Especialista en traumatologia deportiva'
          },
          valor_consulta: {
            type: 'number',
            format: 'float',
            minimum: 0.01,
            description: 'Valor de la consulta en moneda local',
            example: 10000.00
          }
        },
        example: {
          id_usuario: 3,
          id_especialidad: 3,
          matricula: 3000,
          descripcion: 'Especialista en traumatologia deportiva',
          valor_consulta: 10000.00
        }
      },
      Paciente: {
        type: 'object',
        properties: {
          id_paciente: { type: 'integer', example: 1 },
          id_usuario: { type: 'integer', example: 5 },
          id_obra_social: { type: 'integer', example: 1 },
          apellido: { type: 'string', example: 'Lopez' },
          nombres: { type: 'string', example: 'Jacinto' },
          email: { type: 'string', example: 'lopjac@correo.com' },
          obra_social: { type: 'string', example: 'Jerarquicos' }
        }
      },
      PacienteInput: {
        type: 'object',
        required: ['id_usuario', 'id_obra_social'],
        properties: {
          id_usuario: {
            type: 'integer',
            minimum: 1,
            description: 'ID del usuario que sera paciente',
            example: 5
          },
          id_obra_social: {
            type: 'integer',
            minimum: 1,
            description: 'ID de la obra social asociada al paciente',
            example: 1
          }
        },
        example: {
          id_usuario: 5,
          id_obra_social: 1
        }
      },
      Usuario: {
        type: 'object',
        properties: {
          id_usuario: { type: 'integer', example: 1 },
          documento: { type: 'string', example: '31000111' },
          apellido: { type: 'string', example: 'Lopez' },
          nombres: { type: 'string', example: 'Marcelo' },
          email: { type: 'string', example: 'lopmar@correo.com' },
          foto_path: { type: 'string', example: '' },
          rol: { type: 'integer', example: 1 },
          activo: { type: 'integer', example: 1 }
        }
      },
      UsuarioInput: {
        type: 'object',
        required: ['documento', 'apellido', 'nombres', 'email', 'contrasenia'],
        properties: {
          documento: {
            type: 'string',
            maxLength: 20,
            description: 'Documento de identidad del usuario',
            example: '31000111'
          },
          apellido: {
            type: 'string',
            maxLength: 100,
            description: 'Apellido del usuario',
            example: 'Lopez'
          },
          nombres: {
            type: 'string',
            maxLength: 100,
            description: 'Nombres del usuario',
            example: 'Marcelo'
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 255,
            description: 'Email unico del usuario',
            example: 'nuevo.usuario@correo.com'
          },
          contrasenia: {
            type: 'string',
            minLength: 6,
            maxLength: 255,
            description: 'Contrasenia de acceso (minimo 6 caracteres)',
            example: 'claveSegura123'
          },
          foto_path: {
            type: 'string',
            nullable: true,
            description: 'Ruta o URL de la foto de perfil (opcional)',
            example: ''
          },
          rol: {
            type: 'integer',
            nullable: true,
            enum: [1, 2],
            description: 'Rol del usuario: 1 administrador, 2 usuario comun',
            example: 2
          }
        },
        example: {
          documento: '41000111',
          apellido: 'Perez',
          nombres: 'Ana',
          email: 'ana.perez@correo.com',
          contrasenia: 'claveSegura123',
          foto_path: '',
          rol: 2
        }
      },
      ObraSocial: {
        type: 'object',
        properties: {
          id_obra_social: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Jerarquicos' },
          descripcion: { type: 'string', example: 'jer' },
          porcentaje_descuento: { type: 'number', format: 'float', example: 10.00 },
          es_particular: { type: 'integer', example: 0 },
          activo: { type: 'integer', example: 1 }
        }
      },
      ObraSocialInput: {
        type: 'object',
        required: ['nombre', 'descripcion', 'porcentaje_descuento'],
        properties: {
          nombre: {
            type: 'string',
            maxLength: 120,
            description: 'Nombre de la obra social',
            example: 'Jerarquicos'
          },
          descripcion: {
            type: 'string',
            maxLength: 255,
            description: 'Descripcion breve de cobertura',
            example: 'Cobertura general para consultas y practicas'
          },
          porcentaje_descuento: {
            type: 'number',
            format: 'float',
            minimum: 0,
            maximum: 100,
            description: 'Porcentaje de descuento aplicado',
            example: 10.00
          },
          es_particular: {
            type: 'integer',
            minimum: 0,
            maximum: 1,
            nullable: true,
            description: '0 si es obra social, 1 si es atencion particular',
            example: 0
          }
        },
        example: {
          nombre: 'Jerarquicos',
          descripcion: 'Cobertura general para consultas y practicas',
          porcentaje_descuento: 10.00,
          es_particular: 0
        }
      },
      ValidationErrorItem: {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'field' },
          value: { nullable: true },
          msg: { type: 'string', example: 'El campo nombre es obligatorio' },
          path: { type: 'string', example: 'nombre' },
          location: { type: 'string', example: 'body' }
        }
      },
      SuccessResponseListEspecialidad: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Especialidad' }
          }
        }
      },
      SuccessResponseListMedico: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Medico' }
          }
        }
      },
      SuccessResponseListPaciente: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Paciente' }
          }
        }
      },
      SuccessResponseListUsuario: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/Usuario' }
          }
        }
      },
      SuccessResponseListObraSocial: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/ObraSocial' }
          }
        }
      },
      SuccessResponseItemEspecialidad: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: { $ref: '#/components/schemas/Especialidad' }
        }
      },
      SuccessResponseItemMedico: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: { $ref: '#/components/schemas/Medico' }
        }
      },
      SuccessResponseItemPaciente: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: { $ref: '#/components/schemas/Paciente' }
        }
      },
      SuccessResponseItemUsuario: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: { $ref: '#/components/schemas/Usuario' }
        }
      },
      SuccessResponseItemObraSocial: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: { $ref: '#/components/schemas/ObraSocial' }
        }
      },
      SuccessResponseMessage: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: false },
          status: { type: 'integer', example: 200 },
          body: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Registro eliminado correctamente' }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: true },
          status: { type: 'integer', example: 404 },
          body: { type: 'string', example: 'Recurso no encontrado' }
        }
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'boolean', example: true },
          status: { type: 'integer', example: 400 },
          body: {
            type: 'array',
            items: { $ref: '#/components/schemas/ValidationErrorItem' }
          }
        }
      }
    },
    responses: {
      ValidationError: {
        description: 'Error de validación en los datos enviados',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
          }
        }
      },
      NotFound: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      InternalError: {
        description: 'Error interno del servidor',
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

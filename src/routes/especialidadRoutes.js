import express from 'express';

import { 
    getAllEspecialidades, 
    getEspecialidadById, 
    createEspecialidad, 
    updateEspecialidad, 
    deleteEspecialidad 
} from '../controllers/especialidadController.js';

// Importamos los validadores
import { validarEspecialidad, validarIdEspecialidad } from '../validators/especialidadValidator.js';

const router = express.Router();

/**
 * @openapi
 * /especialidades:
 * get:
 * tags: [Especialidades]
 * summary: Listar especialidades activas
 * responses:
 * 200:
 * description: Lista de especialidades activas
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseListEspecialidad'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.get('/', getAllEspecialidades);

/**
 * @openapi
 * /especialidades/{id}:
 * get:
 * tags: [Especialidades]
 * summary: Obtener una especialidad por su ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Detalle de la especialidad
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdEspecialidad, getEspecialidadById);

/**
 * @openapi
 * /especialidades:
 * post:
 * tags: [Especialidades]
 * summary: Crear una nueva especialidad
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EspecialidadInput'
 * responses:
 * 201:
 * description: Specialty created successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.post('/', validarEspecialidad, createEspecialidad);

/**
 * @openapi
 * /especialidades/{id}:
 * put:
 * tags: [Especialidades]
 * summary: Actualizar una especialidad por su ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EspecialidadInput'
 * responses:
 * 200:
 * description: Especialidad actualizada
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdEspecialidad, validarEspecialidad, updateEspecialidad);

/**
 * @openapi
 * /especialidades/{id}:
 * delete:
 * tags: [Especialidades]
 * summary: Eliminar una especialidad (soft delete)
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Especialidad eliminada correctamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseMessage'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.delete('/:id', validarIdEspecialidad, deleteEspecialidad);

export default router;
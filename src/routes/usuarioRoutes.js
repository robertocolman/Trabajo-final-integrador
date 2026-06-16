import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { validarUsuario, validarIdUsuario } from '../validators/usuarioValidator.js';

const router = express.Router();

const getMethod = usuarioController.getAllUsuarios || usuarioController.getUsuarios || usuarioController.getAll || usuarioController.listar || Object.values(usuarioController).find(f => f.name?.toLowerCase().includes('all') || f.name?.toLowerCase().includes('usuario'));
const getByIdMethod = usuarioController.getUsuarioById || usuarioController.getById || Object.values(usuarioController).find(f => f.name?.toLowerCase().includes('byid'));
const createMethod = usuarioController.createUsuario || usuarioController.create || usuarioController.store || Object.values(usuarioController).find(f => f.name?.toLowerCase().includes('create'));
const updateMethod = usuarioController.updateUsuario || usuarioController.update || usuarioController.modify || Object.values(usuarioController).find(f => f.name?.toLowerCase().includes('update'));
const deleteMethod = usuarioController.deleteUsuario || usuarioController.delete || usuarioController.remove || Object.values(usuarioController).find(f => f.name?.toLowerCase().includes('delete'));

/**
 * @openapi
 * /usuarios:
 * get:
 * tags: [Usuarios]
 * summary: Listar usuarios activos
 * responses:
 * 200:
 * description: Lista de usuarios activos
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseListUsuario'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.get('/', getMethod);

/**
 * @openapi
 * /usuarios/{id}:
 * get:
 * tags: [Usuarios]
 * summary: Obtener un usuario por su ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Detalle del usuario
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemUsuario'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdUsuario, getByIdMethod);

/**
 * @openapi
 * /usuarios:
 * post:
 * tags: [Usuarios]
 * summary: Crear un nuevo usuario
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UsuarioInput'
 * responses:
 * 201:
 * description: Usuario creado exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemUsuario'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.post('/', validarUsuario, createMethod);

/**
 * @openapi
 * /usuarios/{id}:
 * put:
 * tags: [Usuarios]
 * summary: Actualizar un usuario por su ID
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
 * $ref: '#/components/schemas/UsuarioInput'
 * responses:
 * 200:
 * description: Usuario actualizado
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SuccessResponseItemUsuario'
 * 400:
 * $ref: '#/components/responses/ValidationError'
 * 404:
 * $ref: '#/components/responses/NotFound'
 * 500:
 * $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdUsuario, validarUsuario, updateMethod);

/**
 * @openapi
 * /usuarios/{id}:
 * delete:
 * tags: [Usuarios]
 * summary: Eliminar un usuario (soft delete)
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Usuario eliminado correctamente
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
router.delete('/:id', validarIdUsuario, deleteMethod);

router.post('/login', usuarioController.login);

export default router;
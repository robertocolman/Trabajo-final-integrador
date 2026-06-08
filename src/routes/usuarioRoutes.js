import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { validarUsuario, validarIdUsuario } from '../validators/usuarioValidator.js';

const router = express.Router();

/** @openapi
 * /usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios activos
 */
router.get('/', usuarioController.getAllUsuarios);

/** @openapi
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener usuario por ID
 */
router.get('/:id', validarIdUsuario, usuarioController.getUsuarioById);

/** @openapi
 * /usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crear usuario
 */
router.post('/', validarUsuario, usuarioController.createUsuario);

/** @openapi
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar usuario
 */
router.put('/:id', validarIdUsuario, validarUsuario, usuarioController.updateUsuario);

/** @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Eliminar (soft delete)
 */
router.delete('/:id', validarIdUsuario, usuarioController.deleteUsuario);

export default router;

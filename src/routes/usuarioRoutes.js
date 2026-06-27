import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
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
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios activos
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseListUsuario'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', authenticateToken, authorizeRole(['admin']), getMethod);

router.get('/:id', authenticateToken, authorizeRole(['admin']), validarIdUsuario, getByIdMethod);

router.post('/', validarUsuario, createMethod);

router.put('/:id', authenticateToken, authorizeRole(['admin']), validarIdUsuario, validarUsuario, updateMethod);

router.delete('/:id', authenticateToken, authorizeRole(['admin']), validarIdUsuario, deleteMethod);

router.post('/login', usuarioController.login);

export default router;
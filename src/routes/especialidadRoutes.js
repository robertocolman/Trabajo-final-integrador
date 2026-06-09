import express from 'express';
import * as especialidadController from '../controllers/especialidadController.js';
import { validarEspecialidad, validarIdEspecialidad } from '../validators/especialidadValidator.js';

const router = express.Router();

/** @openapi
 * /especialidades:
 *   get:
 *     tags: [Especialidades]
 *     summary: Listar especialidades activas
 *     responses:
 *       200:
 *         description: Lista de especialidades activas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseListEspecialidad'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', especialidadController.getAllEspecialidades);

/** @openapi
 * /especialidades/{id}:
 *   get:
 *     tags: [Especialidades]
 *     summary: Obtener especialidad por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdEspecialidad, especialidadController.getEspecialidadById);

/** @openapi
 * /especialidades:
 *   post:
 *     tags: [Especialidades]
 *     summary: Crear especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadInput'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadInput'
 *     responses:
 *       201:
 *         description: Especialidad creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarEspecialidad, especialidadController.createEspecialidad);

/** @openapi
 * /especialidades/{id}:
 *   put:
 *     tags: [Especialidades]
 *     summary: Actualizar especialidad
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadInput'
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemEspecialidad'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdEspecialidad, validarEspecialidad, especialidadController.updateEspecialidad);

/** @openapi
 * /especialidades/{id}:
 *   delete:
 *     tags: [Especialidades]
 *     summary: Eliminar especialidad (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseMessage'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.delete('/:id', validarIdEspecialidad, especialidadController.deleteEspecialidad);

export default router;
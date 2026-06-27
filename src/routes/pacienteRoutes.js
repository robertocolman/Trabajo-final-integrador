import express from 'express';
import * as pacienteController from '../controllers/pacienteController.js';
import { validarPaciente, validarIdPaciente } from '../validators/pacienteValidator.js';

const router = express.Router();

const getMethod = pacienteController.getAllPacientes || pacienteController.getPacientes || pacienteController.getAll || pacienteController.listar || Object.values(pacienteController).find(f => f.name?.toLowerCase().includes('all') || f.name?.toLowerCase().includes('paciente'));
const getByIdMethod = pacienteController.getPacienteById || pacienteController.getById || Object.values(pacienteController).find(f => f.name?.toLowerCase().includes('byid'));
const createMethod = pacienteController.createPaciente || pacienteController.create || pacienteController.store || Object.values(pacienteController).find(f => f.name?.toLowerCase().includes('create'));
const updateMethod = pacienteController.updatePaciente || pacienteController.update || pacienteController.modify || Object.values(pacienteController).find(f => f.name?.toLowerCase().includes('update'));
const deleteMethod = pacienteController.deletePaciente || pacienteController.delete || pacienteController.remove || Object.values(pacienteController).find(f => f.name?.toLowerCase().includes('delete'));

/**
 * @openapi
 * /pacientes:
 *   get:
 *     tags: [Pacientes]
 *     summary: Listar pacientes activos
 *     responses:
 *       200:
 *         description: Lista de pacientes activos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseListPaciente'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', getMethod);

/**
 * @openapi
 * /pacientes/{id}:
 *   get:
 *     tags: [Pacientes]
 *     summary: Obtener un paciente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemPaciente'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdPaciente, getByIdMethod);

/**
 * @openapi
 * /pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Crear un nuevo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemPaciente'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarPaciente, createMethod);

/**
 * @openapi
 * /pacientes/{id}:
 *   put:
 *     tags: [Pacientes]
 *     summary: Actualizar un paciente por su ID
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
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemPaciente'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdPaciente, validarPaciente, updateMethod);

/**
 * @openapi
 * /pacientes/{id}:
 *   delete:
 *     tags: [Pacientes]
 *     summary: Eliminar un paciente (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado correctamente
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
router.delete('/:id', validarIdPaciente, deleteMethod);

export default router;
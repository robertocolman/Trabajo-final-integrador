import express from 'express';
import {
    getAllTurnos,
    getTurnoById,
    getTurnosByMedico,
    getTurnosByPaciente,
    createTurno,
    marcarAtendido,
    deleteTurno
} from '../controllers/turnoController.js';
import { validarTurno, validarIdTurno } from '../validators/turnoValidator.js';

const router = express.Router();

/**
 * @openapi
 * /turnos:
 *   get:
 *     tags: [Turnos]
 *     summary: Listar todos los turnos activos
 *     responses:
 *       200:
 *         description: Lista de turnos
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', getAllTurnos);

/**
 * @openapi
 * /turnos/{id}:
 *   get:
 *     tags: [Turnos]
 *     summary: Obtener un turno por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno encontrado
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', validarIdTurno, getTurnoById);

/**
 * @openapi
 * /turnos/medico/{id}:
 *   get:
 *     tags: [Turnos]
 *     summary: Listar turnos de un médico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turnos del médico
 */
router.get('/medico/:id', validarIdTurno, getTurnosByMedico);

/**
 * @openapi
 * /turnos/paciente/{id}:
 *   get:
 *     tags: [Turnos]
 *     summary: Listar turnos de un paciente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turnos del paciente
 */
router.get('/paciente/:id', validarIdTurno, getTurnosByPaciente);

/**
 * @openapi
 * /turnos:
 *   post:
 *     tags: [Turnos]
 *     summary: Crear un nuevo turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_paciente, id_medico, fecha_hora]
 *             properties:
 *               id_paciente:
 *                 type: integer
 *               id_medico:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Turno creado con valor_total calculado
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post('/', validarTurno, createTurno);

/**
 * @openapi
 * /turnos/{id}/atendido:
 *   patch:
 *     tags: [Turnos]
 *     summary: Marcar un turno como atendido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.patch('/:id/atendido', validarIdTurno, marcarAtendido);

/**
 * @openapi
 * /turnos/{id}:
 *   delete:
 *     tags: [Turnos]
 *     summary: Cancelar un turno (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno cancelado
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:id', validarIdTurno, deleteTurno);

export default router;

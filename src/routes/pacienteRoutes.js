import express from 'express';
import * as pacienteController from '../controllers/pacienteController.js';
import { check, param, validationResult } from 'express-validator';

const router = express.Router();

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, status: 400, body: errors.array() });
    }
    next();
};

const validarPaciente = [
    check('id_usuario').exists().isInt({ gt: 0 }),
    check('id_obra_social').exists().isInt({ gt: 0 }),
    validarResultados
];

const validarIdPaciente = [
    param('id').exists().isInt({ gt: 0 }),
    validarResultados
];

/** @openapi
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
router.get('/', pacienteController.getAllPacientes);

/** @openapi
 * /pacientes/{id}:
 *   get:
 *     tags: [Pacientes]
 *     summary: Obtener paciente por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
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
router.get('/:id', validarIdPaciente, pacienteController.getPacienteById);

/** @openapi
 * /pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Crear paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       201:
 *         description: Paciente creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemPaciente'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarPaciente, pacienteController.createPaciente);

/** @openapi
 * /pacientes/{id}:
 *   put:
 *     tags: [Pacientes]
 *     summary: Actualizar paciente
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
router.put('/:id', validarIdPaciente, validarPaciente, pacienteController.updatePaciente);

/** @openapi
 * /pacientes/{id}:
 *   delete:
 *     tags: [Pacientes]
 *     summary: Eliminar (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado
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
router.delete('/:id', validarIdPaciente, pacienteController.deletePaciente);

export default router;

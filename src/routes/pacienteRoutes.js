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
    check('nombre').exists().isString().isLength({ max: 120 }),
    check('apellido').exists().isString().isLength({ max: 120 }),
    check('dni').optional().isString().isLength({ max: 20 }),
    check('fecha_nacimiento').optional().isISO8601(),
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
 */
router.get('/', pacienteController.getAllPacientes);

/** @openapi
 * /pacientes/{id}:
 *   get:
 *     tags: [Pacientes]
 *     summary: Obtener paciente por ID
 */
router.get('/:id', validarIdPaciente, pacienteController.getPacienteById);

/** @openapi
 * /pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Crear paciente
 */
router.post('/', validarPaciente, pacienteController.createPaciente);

/** @openapi
 * /pacientes/{id}:
 *   put:
 *     tags: [Pacientes]
 *     summary: Actualizar paciente
 */
router.put('/:id', validarIdPaciente, validarPaciente, pacienteController.updatePaciente);

/** @openapi
 * /pacientes/{id}:
 *   delete:
 *     tags: [Pacientes]
 *     summary: Eliminar (soft delete)
 */
router.delete('/:id', validarIdPaciente, pacienteController.deletePaciente);

export default router;

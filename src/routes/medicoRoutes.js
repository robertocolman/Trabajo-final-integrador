import express from 'express';
import * as medicoController from '../controllers/medicoController.js';
import { check, param, validationResult } from 'express-validator';

const router = express.Router();

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, status: 400, body: errors.array() });
    }
    next();
};

const validarMedico = [
    check('nombre').exists().isString().isLength({ max: 120 }),
    check('apellido').exists().isString().isLength({ max: 120 }),
    check('matricula').optional().isString().isLength({ max: 50 }),
    validarResultados
];

const validarIdMedico = [
    param('id').exists().isInt({ gt: 0 }),
    validarResultados
];

/** @openapi
 * /medicos:
 *   get:
 *     tags: [Medicos]
 *     summary: Listar médicos activos
 */
router.get('/', medicoController.getAllMedicos);

/** @openapi
 * /medicos/{id}:
 *   get:
 *     tags: [Medicos]
 *     summary: Obtener médico por ID
 */
router.get('/:id', validarIdMedico, medicoController.getMedicoById);

/** @openapi
 * /medicos:
 *   post:
 *     tags: [Medicos]
 *     summary: Crear médico
 */
router.post('/', validarMedico, medicoController.createMedico);

/** @openapi
 * /medicos/{id}:
 *   put:
 *     tags: [Medicos]
 *     summary: Actualizar médico
 */
router.put('/:id', validarIdMedico, validarMedico, medicoController.updateMedico);

/** @openapi
 * /medicos/{id}:
 *   delete:
 *     tags: [Medicos]
 *     summary: Eliminar (soft delete)
 */
router.delete('/:id', validarIdMedico, medicoController.deleteMedico);

export default router;

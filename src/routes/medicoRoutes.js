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
    check('id_usuario').exists().isInt({ gt: 0 }),
    check('id_especialidad').exists().isInt({ gt: 0 }),
    check('matricula').exists().isInt({ gt: 0 }),
    check('descripcion').optional().isString(),
    check('valor_consulta').exists().isFloat({ gt: 0 }),
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
 *     responses:
 *       200:
 *         description: Lista de médicos activos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseListMedico'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', medicoController.getAllMedicos);

/** @openapi
 * /medicos/{id}:
 *   get:
 *     tags: [Medicos]
 *     summary: Obtener médico por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemMedico'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdMedico, medicoController.getMedicoById);

/** @openapi
 * /medicos:
 *   post:
 *     tags: [Medicos]
 *     summary: Crear médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/MedicoInput'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoInput'
 *     responses:
 *       201:
 *         description: Médico creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemMedico'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarMedico, medicoController.createMedico);

/** @openapi
 * /medicos/{id}:
 *   put:
 *     tags: [Medicos]
 *     summary: Actualizar médico
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
 *             $ref: '#/components/schemas/MedicoInput'
 *     responses:
 *       200:
 *         description: Médico actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemMedico'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdMedico, validarMedico, medicoController.updateMedico);

/** @openapi
 * /medicos/{id}:
 *   delete:
 *     tags: [Medicos]
 *     summary: Eliminar (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico eliminado
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
router.delete('/:id', validarIdMedico, medicoController.deleteMedico);

export default router;

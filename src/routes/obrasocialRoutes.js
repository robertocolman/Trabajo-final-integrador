import express from 'express';
import * as obraController from '../controllers/obrasocialController.js';
import { validarObra, validarIdObra } from '../validators/obrasocialValidator.js';

const router = express.Router();

/** @openapi
 * /obras_sociales:
 *   get:
 *     tags: [ObrasSociales]
 *     summary: Listar obras sociales activas
 *     responses:
 *       200:
 *         description: Lista de obras sociales activas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseListObraSocial'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', obraController.getAllObras);

/** @openapi
 * /obras_sociales/{id}:
 *   get:
 *     tags: [ObrasSociales]
 *     summary: Obtener obra social por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemObraSocial'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validarIdObra, obraController.getObraById);

/** @openapi
 * /obras_sociales:
 *   post:
 *     tags: [ObrasSociales]
 *     summary: Crear obra social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialInput'
 *     responses:
 *       201:
 *         description: Obra social creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemObraSocial'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarObra, obraController.createObra);

/** @openapi
 * /obras_sociales/{id}:
 *   put:
 *     tags: [ObrasSociales]
 *     summary: Actualizar obra social
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
 *             $ref: '#/components/schemas/ObraSocialInput'
 *     responses:
 *       200:
 *         description: Obra social actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemObraSocial'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/:id', validarIdObra, validarObra, obraController.updateObra);

/** @openapi
 * /obras_sociales/{id}:
 *   delete:
 *     tags: [ObrasSociales]
 *     summary: Eliminar (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social eliminada
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
router.delete('/:id', validarIdObra, obraController.deleteObra);

export default router;

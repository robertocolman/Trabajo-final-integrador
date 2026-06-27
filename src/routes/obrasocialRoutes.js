import express from 'express';
import * as obraSocialController from '../controllers/obrasocialController.js';
import { validarObra, validarIdObra } from '../validators/obrasocialValidator.js';

const router = express.Router();

const getMethod = obraSocialController.getObrasSociales || obraSocialController.getAllObrasSociales || obraSocialController.getAll || obraSocialController.listar || Object.values(obraSocialController).find(f => f.name?.toLowerCase().includes('getall') || f.name?.toLowerCase().includes('getobra'));
const getByIdMethod = obraSocialController.getObraSocialById || obraSocialController.getObraSocialByPk || obraSocialController.getById || obraSocialController.getByIdObraSocial || Object.values(obraSocialController).find(f => f.name?.toLowerCase().includes('byid'));
const createMethod = obraSocialController.createObraSocial || obraSocialController.create || obraSocialController.store || Object.values(obraSocialController).find(f => f.name?.toLowerCase().includes('create'));
const updateMethod = obraSocialController.updateObraSocial || obraSocialController.update || obraSocialController.modify || Object.values(obraSocialController).find(f => f.name?.toLowerCase().includes('update'));
const deleteMethod = obraSocialController.deleteObraSocial || obraSocialController.delete || obraSocialController.remove || Object.values(obraSocialController).find(f => f.name?.toLowerCase().includes('delete'));

/**
 * @openapi
 * /obras_sociales:
 *   get:
 *     tags: [Obras Sociales]
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
router.get('/', getMethod);

/**
 * @openapi
 * /obras_sociales/{id}:
 *   get:
 *     tags: [Obras Sociales]
 *     summary: Obtener una obra social por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la obra social
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
router.get('/:id', validarIdObra, getByIdMethod);

/**
 * @openapi
 * /obras_sociales:
 *   post:
 *     tags: [Obras Sociales]
 *     summary: Crear una nueva obra social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialInput'
 *     responses:
 *       201:
 *         description: Obra social creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseItemObraSocial'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', validarObra, createMethod);

/**
 * @openapi
 * /obras_sociales/{id}:
 *   put:
 *     tags: [Obras Sociales]
 *     summary: Actualizar una obra social por su ID
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
router.put('/:id', validarIdObra, validarObra, updateMethod);

/**
 * @openapi
 * /obras_sociales/{id}:
 *   delete:
 *     tags: [Obras Sociales]
 *     summary: Eliminar una obra social (soft delete)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social eliminada correctamente
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
router.delete('/:id', validarIdObra, deleteMethod);

export default router;
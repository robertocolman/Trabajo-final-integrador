import express from 'express';
import * as obraController from '../controllers/obrasocialController.js';
import { validarObra, validarIdObra } from '../validators/obrasocialValidator.js';

const router = express.Router();

/** @openapi
 * /obras_sociales:
 *   get:
 *     tags: [ObrasSociales]
 *     summary: Listar obras sociales activas
 */
router.get('/', obraController.getAllObras);

/** @openapi
 * /obras_sociales/{id}:
 *   get:
 *     tags: [ObrasSociales]
 *     summary: Obtener obra social por ID
 */
router.get('/:id', validarIdObra, obraController.getObraById);

/** @openapi
 * /obras_sociales:
 *   post:
 *     tags: [ObrasSociales]
 *     summary: Crear obra social
 */
router.post('/', validarObra, obraController.createObra);

/** @openapi
 * /obras_sociales/{id}:
 *   put:
 *     tags: [ObrasSociales]
 *     summary: Actualizar obra social
 */
router.put('/:id', validarIdObra, validarObra, obraController.updateObra);

/** @openapi
 * /obras_sociales/{id}:
 *   delete:
 *     tags: [ObrasSociales]
 *     summary: Eliminar (soft delete)
 */
router.delete('/:id', validarIdObra, obraController.deleteObra);

export default router;

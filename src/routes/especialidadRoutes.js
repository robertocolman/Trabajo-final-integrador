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
	*         description: Lista de especialidades
	*         content:
	*           application/json:
	*             schema:
	*               $ref: '#/components/schemas/ApiResponseEspecialidad'
	*/
router.get('/', especialidadController.getAllEspecialidades);

/** @openapi
	* /especialidades/{id}:
	*   get:
	*     tags: [Especialidades]
	*     summary: Obtener por ID
	*     parameters:
	*       - name: id
	*         in: path
	*         required: true
	*         schema:
	*           type: integer
	*/
router.get('/:id', validarIdEspecialidad, especialidadController.getEspecialidadById);

/** @openapi
	* /especialidades:
	*   post:
	*     tags: [Especialidades]
	*     summary: Crear especialidad
	*/
router.post('/', validarEspecialidad, especialidadController.createEspecialidad);

/** @openapi
	* /especialidades/{id}:
	*   put:
	*     tags: [Especialidades]
	*     summary: Actualizar especialidad
	*/
router.put('/:id', validarIdEspecialidad, validarEspecialidad, especialidadController.updateEspecialidad);

/** @openapi
	* /especialidades/{id}:
	*   delete:
	*     tags: [Especialidades]
	*     summary: Eliminar (soft delete)
	*/
router.delete('/:id', validarIdEspecialidad, especialidadController.deleteEspecialidad);

export default router;
import express from 'express';
import * as especialidadController from '../controllers/especialidadController.js';
import { validarEspecialidad, validarIdEspecialidad } from '../validators/especialidadValidator.js';

const router = express.Router();

router.get('/', especialidadController.getAllEspecialidades);

router.get('/:id', validarIdEspecialidad, especialidadController.getEspecialidadById);
router.post('/', validarEspecialidad, especialidadController.createEspecialidad);
router.put('/:id', validarIdEspecialidad, validarEspecialidad, especialidadController.updateEspecialidad);
router.delete('/:id', validarIdEspecialidad, especialidadController.deleteEspecialidad);

export default router;
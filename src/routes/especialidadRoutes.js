const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');
const { validarEspecialidad, validarIdEspecialidad } = require('../validators/especialidadValidator');

router.get('/', especialidadController.getAllEspecialidades);

router.get('/:id', validarIdEspecialidad, especialidadController.getEspecialidadById);
router.post('/', validarEspecialidad, especialidadController.createEspecialidad);
router.put('/:id', validarIdEspecialidad, validarEspecialidad, especialidadController.updateEspecialidad);
router.delete('/:id', validarIdEspecialidad, especialidadController.deleteEspecialidad);

module.exports = router;
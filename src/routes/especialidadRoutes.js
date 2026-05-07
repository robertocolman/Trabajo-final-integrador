const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

router.get('/', especialidadController.getAllEspecialidades);
router.get('/:id', especialidadController.getEspecialidadById);
router.post('/', especialidadController.createEspecialidad);
router.put('/:id', especialidadController.updateEspecialidad);
router.delete('/:id', especialidadController.deleteEspecialidad);

module.exports = router;

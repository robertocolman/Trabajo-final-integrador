const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

// 1. Importamos TUS validaciones subiendo un nivel (../) y entrando a tu carpeta
const { validarEspecialidad, validarIdEspecialidad } = require('../validators/especialidadValidator');

// 2. Inyectamos las validaciones en el medio de las peticiones
router.get('/', especialidadController.getAllEspecialidades);

router.get('/:id', validarIdEspecialidad, especialidadController.getEspecialidadById);
router.post('/', validarEspecialidad, especialidadController.createEspecialidad);
router.put('/:id', validarIdEspecialidad, validarEspecialidad, especialidadController.updateEspecialidad);
router.delete('/:id', validarIdEspecialidad, especialidadController.deleteEspecialidad);

module.exports = router;
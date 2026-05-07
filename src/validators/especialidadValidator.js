const { check, param, validationResult } = require('express-validator');

// Función central para manejar los errores y responder con el status 400
const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
};

// Validaciones para POST (para Crear) y PUT (para Editar)
const validarEspecialidad = [
    check('nombre')
        .exists().withMessage('El campo nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 120 }).withMessage('El nombre no puede superar los 120 caracteres'),
    validarResultados
];

// Validaciones para el ID en la URL (GET por id, PUT, DELETE)
const validarIdEspecialidad = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero positivo'),
    validarResultados
];

module.exports = {
    validarEspecialidad,
    validarIdEspecialidad
};
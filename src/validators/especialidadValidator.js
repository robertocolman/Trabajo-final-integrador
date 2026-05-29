import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarEspecialidad = [
    check('nombre')
        .exists().withMessage('El campo nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 120 }).withMessage('El nombre no puede superar los 120 caracteres'),
    validarResultados
];

const validarIdEspecialidad = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero positivo'),
    validarResultados
];

export { validarEspecialidad, validarIdEspecialidad };
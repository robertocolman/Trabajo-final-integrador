import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarMedico = [
    check('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 120 }).withMessage('El nombre excede 120 caracteres'),
    check('apellido')
        .exists().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser texto')
        .isLength({ max: 120 }).withMessage('El apellido excede 120 caracteres'),
    check('matricula')
        .optional()
        .isString().withMessage('La matrícula debe ser texto')
        .isLength({ max: 50 }).withMessage('La matrícula excede 50 caracteres'),
    validarResultados
];

const validarIdMedico = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarMedico, validarIdMedico };

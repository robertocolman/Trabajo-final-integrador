import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarUsuario = [
    check('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 120 }).withMessage('El nombre excede 120 caracteres'),
    check('username')
        .exists().withMessage('El username es obligatorio')
        .isString().withMessage('El username debe ser texto')
        .isLength({ max: 80 }).withMessage('El username excede 80 caracteres'),
    check('password')
        .exists().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('role')
        .optional().isString().withMessage('El role debe ser texto'),
    validarResultados
];

const validarIdUsuario = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarUsuario, validarIdUsuario };

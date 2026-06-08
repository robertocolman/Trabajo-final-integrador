import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarObra = [
    check('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 150 }).withMessage('El nombre excede 150 caracteres'),
    check('telefono')
        .optional()
        .isString().withMessage('El teléfono debe ser texto')
        .isLength({ max: 40 }).withMessage('El teléfono excede 40 caracteres'),
    validarResultados
];

const validarIdObra = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarObra, validarIdObra };

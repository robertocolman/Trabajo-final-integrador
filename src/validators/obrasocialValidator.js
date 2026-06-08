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
        .isLength({ max: 120 }).withMessage('El nombre excede 120 caracteres'),
    check('descripcion')
        .exists().withMessage('La descripción es obligatoria')
        .isString().withMessage('La descripción debe ser texto')
        .isLength({ max: 255 }).withMessage('La descripción excede 255 caracteres'),
    check('porcentaje_descuento')
        .exists().withMessage('El porcentaje de descuento es obligatorio')
        .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje de descuento debe estar entre 0 y 100'),
    check('es_particular')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('es_particular debe ser 0 o 1'),
    validarResultados
];

const validarIdObra = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarObra, validarIdObra };

import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarPaciente = [
    check('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ max: 120 }).withMessage('El nombre excede 120 caracteres'),
    check('apellido')
        .exists().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser texto')
        .isLength({ max: 120 }).withMessage('El apellido excede 120 caracteres'),
    check('dni')
        .optional()
        .isString().withMessage('El DNI debe ser texto')
        .isLength({ max: 20 }).withMessage('El DNI excede 20 caracteres'),
    check('fecha_nacimiento')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe tener formato ISO8601 (YYYY-MM-DD)'),
    check('id_obra_social')
        .optional({ nullable: true })
        .isInt({ gt: 0 }).withMessage('El ID de la obra social debe ser un entero positivo'),
    check('id_usuario')
        .exists().withMessage('El ID de usuario asociado es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID de usuario debe ser un entero positivo'),
    validarResultados
];

const validarIdPaciente = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarPaciente, validarIdPaciente };

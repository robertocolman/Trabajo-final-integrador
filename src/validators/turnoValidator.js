import { check, param, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array(), 400);
    }
    next();
};

const validarTurno = [
    check('id_paciente')
        .exists().withMessage('El ID del paciente es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID del paciente debe ser un entero positivo'),
    check('id_medico')
        .exists().withMessage('El ID del médico es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID del médico debe ser un entero positivo'),
    check('fecha_hora')
        .exists().withMessage('La fecha y hora del turno son obligatorias')
        .isISO8601().withMessage('La fecha y hora deben tener un formato ISO8601 válido'),
    check('valor_total')
        .optional()
        .isFloat({ min: 0 }).withMessage('El valor total debe ser un número decimal positivo'),
    validarResultados
];

const validarIdTurno = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarTurno, validarIdTurno };
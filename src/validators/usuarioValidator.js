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
    check('documento')
        .trim()
        .exists().withMessage('El documento es obligatorio')
        .notEmpty().withMessage('El documento no puede estar vacío')
        .isString().withMessage('El documento debe ser texto')
        .isLength({ max: 20 }).withMessage('El documento excede 20 caracteres'),
    check('apellido')
        .trim()
        .exists().withMessage('El apellido es obligatorio')
        .notEmpty().withMessage('El apellido no puede estar vacío')
        .isString().withMessage('El apellido debe ser texto')
        .isLength({ max: 100 }).withMessage('El apellido excede 100 caracteres'),
    check('nombres')
        .trim()
        .exists().withMessage('Los nombres son obligatorios')
        .notEmpty().withMessage('Los nombres no pueden estar vacíos')
        .isString().withMessage('Los nombres deben ser texto')
        .isLength({ max: 100 }).withMessage('Los nombres exceden 100 caracteres'),
    check('email')
        .trim()
        .exists().withMessage('El email es obligatorio')
        .notEmpty().withMessage('El email no puede estar vacío')
        .isEmail().withMessage('El email no es válido')
        .isLength({ max: 255 }).withMessage('El email excede 255 caracteres'),
    check('contrasenia')
        .trim()
        .exists().withMessage('La contraseña es obligatoria')
        .notEmpty().withMessage('La contraseña no puede estar vacía')
        .isString().withMessage('La contraseña debe ser texto')
        .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
    check('foto_path')
        .optional().isString().withMessage('La foto debe ser texto'),
    check('rol')
        .optional().isInt({ gt: 0 }).withMessage('El rol debe ser entero positivo'),
    validarResultados
];

const validarIdUsuario = [
    param('id')
        .exists().withMessage('El ID es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID debe ser entero positivo'),
    validarResultados
];

export { validarUsuario, validarIdUsuario };

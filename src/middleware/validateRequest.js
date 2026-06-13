import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Mapeamos los errores para devolver un formato limpio y ordenado
        const formattedErrors = errors.array().map(err => ({
            campo: err.path,
            mensaje: err.msg
        }));

        // Usamos el responseHandler que ya esta implmeentado en el proyecto
        return errorResponse(res, 'Error de validación en los datos enviados', 400, formattedErrors);
    }
    
    next();
};

export default validateRequest;
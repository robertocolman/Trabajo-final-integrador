import { errorResponse } from '../utils/responseHandler.js';

export const authorizeRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 'No tienes permisos para acceder a esta ruta', 403);
        }
        next();
    };
};

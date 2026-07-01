import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseHandler.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return errorResponse(res, 'Token no proporcionado', 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return errorResponse(res, 'Token invalido o expirado', 403);
        }
        req.user = user;
        next();
    });
};

// Middleware para verificar que el usuario tenga el rol permitido
export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        // Asumiendo que el usuario está autenticado y guardado en req.user
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado: No tenés los permisos necesarios para realizar esta acción."
            });
        }
        next();
    };
};

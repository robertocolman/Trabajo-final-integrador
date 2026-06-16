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

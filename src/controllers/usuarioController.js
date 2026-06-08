import usuarioService from '../services/usuarioService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllUsuarios = async (req, res, next) => {
    try {
        const rows = await usuarioService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.getById(id);
        if (!usuario) return errorResponse(res, 'Usuario no encontrado', 404);
        successResponse(res, usuario);
    } catch (error) {
        next(error);
    }
};

export const createUsuario = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await usuarioService.create(data);
        successResponse(res, created, 201);
    } catch (error) {
        next(error);
    }
};

export const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const affected = await usuarioService.update(id, data);
        if (affected === 0) return errorResponse(res, 'Usuario no encontrado o inactivo', 404);
        successResponse(res, { id, nombre: data.nombre.toUpperCase(), username: data.username, role: data.role || 'user' });
    } catch (error) {
        next(error);
    }
};

export const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await usuarioService.remove(id);
        if (affected === 0) return errorResponse(res, 'Usuario no encontrado o ya inactivo', 404);
        successResponse(res, { message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

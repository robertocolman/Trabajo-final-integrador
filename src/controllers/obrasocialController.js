import obraSocialService from '../services/obrasocialService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllObras = async (req, res, next) => {
    try {
        const rows = await obraSocialService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getObraById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const obra = await obraSocialService.getById(id);
        if (!obra) return errorResponse(res, 'Obra social no encontrada', 404);
        successResponse(res, obra);
    } catch (error) {
        next(error);
    }
};

export const createObra = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await obraSocialService.create(data);
        successResponse(res, created, 201);
    } catch (error) {
        next(error);
    }
};

export const updateObra = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const affected = await obraSocialService.update(id, data);
        if (affected === 0) return errorResponse(res, 'Obra social no encontrada o inactiva', 404);
        successResponse(res, { id: Number(id), ...data });
    } catch (error) {
        next(error);
    }
};

export const deleteObra = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await obraSocialService.remove(id);
        if (affected === 0) return errorResponse(res, 'Obra social no encontrada o ya inactiva', 404);
        successResponse(res, { message: 'Obra social eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

import especialidadService from '../services/especialidadService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllEspecialidades = async (req, res, next) => {
    try {
        const rows = await especialidadService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getEspecialidadById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const especialidad = await especialidadService.getById(id);
        if (!especialidad) return errorResponse(res, 'Especialidad no encontrada', 404);
        successResponse(res, especialidad);
    } catch (error) {
        next(error);
    }
};

export const createEspecialidad = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const created = await especialidadService.create(nombre);
        successResponse(res, created, 201);
    } catch (error) {
        next(error);
    }
};

export const updateEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const affected = await especialidadService.update(id, nombre);
        if (affected === 0) return errorResponse(res, 'Especialidad no encontrada o inactiva', 404);
        successResponse(res, { id, nombre: nombre.toUpperCase() });
    } catch (error) {
        next(error);
    }
};

export const deleteEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await especialidadService.remove(id);
        if (affected === 0) return errorResponse(res, 'Especialidad no encontrada o ya inactiva', 404);
        successResponse(res, { message: 'Especialidad eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};
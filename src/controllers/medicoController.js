import medicoService from '../services/medicoService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllMedicos = async (req, res, next) => {
    try {
        const rows = await medicoService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getMedicoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medico = await medicoService.getById(id);
        if (!medico) return errorResponse(res, 'Médico no encontrado', 404);
        successResponse(res, medico);
    } catch (error) {
        next(error);
    }
};

export const createMedico = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await medicoService.create(data);
        successResponse(res, created, 201);
    } catch (error) {
        next(error);
    }
};

export const updateMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const affected = await medicoService.update(id, data);
        if (affected === 0) return errorResponse(res, 'Médico no encontrado', 404);
        successResponse(res, { id: Number(id), ...data });
    } catch (error) {
        next(error);
    }
};

export const deleteMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await medicoService.remove(id);
        if (affected === 0) return errorResponse(res, 'Médico no encontrado o ya desactivado', 404);
        successResponse(res, { message: 'Médico desactivado correctamente (soft delete por usuario)' });
    } catch (error) {
        next(error);
    }
};

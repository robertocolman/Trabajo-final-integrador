import turnoService from '../services/turnoService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllTurnos = async (req, res, next) => {
    try {
        const rows = await turnoService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getTurnoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const turno = await turnoService.getById(id);
        if (!turno) return errorResponse(res, 'Turno no encontrado', 404);
        successResponse(res, turno);
    } catch (error) {
        next(error);
    }
};

export const getTurnosByMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const turnos = await turnoService.getByMedico(id);
        successResponse(res, turnos);
    } catch (error) {
        next(error);
    }
};

export const getTurnosByPaciente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const turnos = await turnoService.getByPaciente(id);
        successResponse(res, turnos);
    } catch (error) {
        next(error);
    }
};

export const createTurno = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await turnoService.create(data);
        successResponse(res, created, 201);
    } catch (error) {
        // Errores de negocio (médico no encontrado, fecha pasada, etc.)
        if (error.message && !error.code) {
            return errorResponse(res, error.message, 400);
        }
        next(error);
    }
};

export const marcarAtendido = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await turnoService.marcarAtendido(id);
        if (affected === 0) return errorResponse(res, 'Turno no encontrado o ya atendido', 404);
        successResponse(res, { message: 'Turno marcado como atendido' });
    } catch (error) {
        if (error.message && !error.code) {
            return errorResponse(res, error.message, 400);
        }
        next(error);
    }
};

export const deleteTurno = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await turnoService.cancelar(id);
        if (affected === 0) return errorResponse(res, 'Turno no encontrado o ya cancelado', 404);
        successResponse(res, { message: 'Turno cancelado correctamente' });
    } catch (error) {
        if (error.message && !error.code) {
            return errorResponse(res, error.message, 400);
        }
        next(error);
    }
};

import pacienteService from '../services/pacienteService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllPacientes = async (req, res, next) => {
    try {
        const rows = await pacienteService.getAll();
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

export const getPacienteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paciente = await pacienteService.getById(id);
        if (!paciente) return errorResponse(res, 'Paciente no encontrado', 404);
        successResponse(res, paciente);
    } catch (error) {
        next(error);
    }
};

export const createPaciente = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await pacienteService.create(data);
        successResponse(res, created, 201);
    } catch (error) {
        next(error);
    }
};

export const updatePaciente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const affected = await pacienteService.update(id, data);
        if (affected === 0) return errorResponse(res, 'Paciente no encontrado o inactivo', 404);
        successResponse(res, { id, ...data, nombre: data.nombre.toUpperCase(), apellido: data.apellido.toUpperCase() });
    } catch (error) {
        next(error);
    }
};

export const deletePaciente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const affected = await pacienteService.remove(id);
        if (affected === 0) return errorResponse(res, 'Paciente no encontrado o ya inactivo', 404);
        successResponse(res, { message: 'Paciente eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

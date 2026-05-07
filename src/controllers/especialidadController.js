const pool = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllEspecialidades = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM especialidades WHERE activo = 1');
        successResponse(res, rows);
    } catch (error) {
        next(error);
    }
};

exports.getEspecialidadById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1', [id]);
        if (rows.length === 0) {
            return errorResponse(res, 'Especialidad no encontrada', 404);
        }
        successResponse(res, rows[0]);
    } catch (error) {
        next(error);
    }
};

exports.createEspecialidad = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const [result] = await pool.query('INSERT INTO especialidades (nombre) VALUES (?)', [nombre]);
        successResponse(res, { id: result.insertId, nombre }, 201);
    } catch (error) {
        next(error);
    }
};

exports.updateEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const [result] = await pool.query('UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1', [nombre, id]);
        if (result.affectedRows === 0) {
            return errorResponse(res, 'Especialidad no encontrada o inactiva', 404);
        }
        successResponse(res, { id, nombre });
    } catch (error) {
        next(error);
    }
};

exports.deleteEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1', [id]);
        if (result.affectedRows === 0) {
            return errorResponse(res, 'Especialidad no encontrada o ya inactiva', 404);
        }
        successResponse(res, { message: 'Especialidad eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};
import pool from '../config/db.js';

const medicoModel = {
    getAll: async () => {
        const query = 'SELECT * FROM medicos WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT * FROM medicos WHERE id_medico = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ nombre, apellido, matricula, especialidad_id }) => {
        const query = `INSERT INTO medicos (nombre, apellido, matricula, especialidad_id, activo) VALUES (?, ?, ?, ?, 1)`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), apellido.toUpperCase(), matricula, especialidad_id || null]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { nombre, apellido, matricula, especialidad_id }) => {
        const query = `UPDATE medicos SET nombre = ?, apellido = ?, matricula = ?, especialidad_id = ? WHERE id_medico = ? AND activo = 1`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), apellido.toUpperCase(), matricula, especialidad_id || null, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = 'UPDATE medicos SET activo = 0 WHERE id_medico = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default medicoModel;

import pool from '../config/db.js';

const pacienteModel = {
    getAll: async () => {
        const query = 'SELECT * FROM pacientes WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT * FROM pacientes WHERE id_paciente = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ nombre, apellido, dni, fecha_nacimiento, obra_social_id }) => {
        const query = `INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, obra_social_id, activo) VALUES (?, ?, ?, ?, ?, 1)`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), apellido.toUpperCase(), dni || null, fecha_nacimiento || null, obra_social_id || null]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { nombre, apellido, dni, fecha_nacimiento, obra_social_id }) => {
        const query = `UPDATE pacientes SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, obra_social_id = ? WHERE id_paciente = ? AND activo = 1`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), apellido.toUpperCase(), dni || null, fecha_nacimiento || null, obra_social_id || null, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = 'UPDATE pacientes SET activo = 0 WHERE id_paciente = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default pacienteModel;

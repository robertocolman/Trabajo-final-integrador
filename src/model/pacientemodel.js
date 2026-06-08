import pool from '../config/db.js';

const pacienteModel = {
    getAll: async () => {
        const query = `
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.id_obra_social,
                u.apellido,
                u.nombres,
                u.email,
                os.nombre AS obra_social
            FROM pacientes p
            INNER JOIN usuarios u ON u.id_usuario = p.id_usuario
            INNER JOIN obras_sociales os ON os.id_obra_social = p.id_obra_social
            WHERE u.activo = 1 AND os.activo = 1
        `;
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = `
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.id_obra_social,
                u.apellido,
                u.nombres,
                u.email,
                os.nombre AS obra_social
            FROM pacientes p
            INNER JOIN usuarios u ON u.id_usuario = p.id_usuario
            INNER JOIN obras_sociales os ON os.id_obra_social = p.id_obra_social
            WHERE p.id_paciente = ? AND u.activo = 1 AND os.activo = 1
        `;
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ id_usuario, id_obra_social }) => {
        const query = `INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)`;
        try {
            const [result] = await pool.query(query, [id_usuario, id_obra_social]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { id_usuario, id_obra_social }) => {
        const query = `UPDATE pacientes SET id_usuario = ?, id_obra_social = ? WHERE id_paciente = ?`;
        try {
            const [result] = await pool.query(query, [id_usuario, id_obra_social, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = `
            UPDATE usuarios u
            INNER JOIN pacientes p ON p.id_usuario = u.id_usuario
            SET u.activo = 0
            WHERE p.id_paciente = ? AND u.activo = 1
        `;
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default pacienteModel;

import pool from '../config/db.js';

const medicoModel = {
    getAll: async () => {
        const query = `
            SELECT
                m.id_medico,
                m.id_usuario,
                m.id_especialidad,
                m.matricula,
                m.descripcion,
                m.valor_consulta,
                u.apellido,
                u.nombres,
                u.email,
                e.nombre AS especialidad
            FROM medicos m
            INNER JOIN usuarios u ON u.id_usuario = m.id_usuario
            INNER JOIN especialidades e ON e.id_especialidad = m.id_especialidad
            WHERE u.activo = 1 AND e.activo = 1
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
                m.id_medico,
                m.id_usuario,
                m.id_especialidad,
                m.matricula,
                m.descripcion,
                m.valor_consulta,
                u.apellido,
                u.nombres,
                u.email,
                e.nombre AS especialidad
            FROM medicos m
            INNER JOIN usuarios u ON u.id_usuario = m.id_usuario
            INNER JOIN especialidades e ON e.id_especialidad = m.id_especialidad
            WHERE m.id_medico = ? AND u.activo = 1 AND e.activo = 1
        `;
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
        const query = `INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)`;
        try {
            const [result] = await pool.query(query, [id_usuario, id_especialidad, matricula, descripcion || null, valor_consulta]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
        const query = `
            UPDATE medicos
            SET id_usuario = ?, id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ?
            WHERE id_medico = ?
        `;
        try {
            const [result] = await pool.query(query, [id_usuario, id_especialidad, matricula, descripcion || null, valor_consulta, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = `
            UPDATE usuarios u
            INNER JOIN medicos m ON m.id_usuario = u.id_usuario
            SET u.activo = 0
            WHERE m.id_medico = ? AND u.activo = 1
        `;
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default medicoModel;

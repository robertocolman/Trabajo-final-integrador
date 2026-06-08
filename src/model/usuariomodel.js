import pool from '../config/db.js';

const usuarioModel = {
    getAll: async () => {
        const query = 'SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo FROM usuarios WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo FROM usuarios WHERE id_usuario = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ documento, apellido, nombres, email, contrasenia, foto_path, rol }) => {
        const query = `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;
        try {
            const [result] = await pool.query(query, [documento, apellido, nombres, email, contrasenia, foto_path || '', rol || 2]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { documento, apellido, nombres, email, contrasenia, foto_path, rol }) => {
        const query = `
            UPDATE usuarios
            SET documento = ?, apellido = ?, nombres = ?, email = ?, contrasenia = ?, foto_path = ?, rol = ?
            WHERE id_usuario = ? AND activo = 1
        `;
        try {
            const [result] = await pool.query(query, [documento, apellido, nombres, email, contrasenia, foto_path || '', rol || 2, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = 'UPDATE usuarios SET activo = 0 WHERE id_usuario = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default usuarioModel;

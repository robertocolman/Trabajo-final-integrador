import pool from '../config/db.js';

const usuarioModel = {
    getAll: async () => {
        const query = 'SELECT id_usuario, nombre, username, role, activo FROM usuarios WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT id_usuario, nombre, username, role, activo FROM usuarios WHERE id_usuario = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ nombre, username, password, role }) => {
        const query = `INSERT INTO usuarios (nombre, username, password, role, activo) VALUES (?, ?, ?, ?, 1)`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), username, password, role || 'user']);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { nombre, username, password, role }) => {
        const query = `UPDATE usuarios SET nombre = ?, username = ?, password = ?, role = ? WHERE id_usuario = ? AND activo = 1`;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), username, password, role || 'user', id]);
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

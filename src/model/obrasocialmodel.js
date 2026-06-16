import pool from '../config/db.js';

const obraSocialModel = {
    getAll: async () => {
        const query = 'SELECT * FROM obras_sociales WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async ({ nombre, descripcion, porcentaje_descuento, es_particular }) => {
        const query = `
            INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular, activo)
            VALUES (?, ?, ?, ?, 1)
        `;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), descripcion, porcentaje_descuento, es_particular || 0]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, { nombre, descripcion, porcentaje_descuento, es_particular }) => {
        const query = `
            UPDATE obras_sociales
            SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
            WHERE id_obra_social = ? AND activo = 1
        `;
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), descripcion, porcentaje_descuento, es_particular || 0, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    softDelete: async (id) => {
        const query = 'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default obraSocialModel;
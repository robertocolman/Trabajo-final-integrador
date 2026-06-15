import pool from '../config/db.js';
const especialidadModel = {
    
    getAll: async () => {
        const query = 'SELECT * FROM especialidades WHERE activo = 1';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        const query = 'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    },

    create: async (nombre) => {
        const normalizedNombre = nombre.toUpperCase();
        const findExistingQuery = `
            SELECT id_especialidad, activo
            FROM especialidades
            WHERE UPPER(nombre) = UPPER(?)
            LIMIT 1
        `;
        const insertQuery = 'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)';
        const reactivateQuery = 'UPDATE especialidades SET nombre = ?, activo = 1 WHERE id_especialidad = ?';

        try {
            const [existingRows] = await pool.query(findExistingQuery, [normalizedNombre]);
            const existing = existingRows[0];

            if (existing?.activo === 1) {
                const duplicateError = new Error('Registro duplicado en nombre');
                duplicateError.code = 'ER_DUP_ENTRY';
                duplicateError.sqlMessage = "Duplicate entry for key 'nombre'";
                throw duplicateError;
            }

            if (existing?.activo === 0) {
                await pool.query(reactivateQuery, [normalizedNombre, existing.id_especialidad]);
                return { id: existing.id_especialidad, reactivated: true };
            }

            const [result] = await pool.query(insertQuery, [normalizedNombre]);
            return { id: result.insertId, reactivated: false };
        } catch (error) {
            throw error;
        }
    },

    update: async (id, nombre) => {
        const query = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase(), id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
    ,
    softDelete: async (id) => {
        const query = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

export default especialidadModel;
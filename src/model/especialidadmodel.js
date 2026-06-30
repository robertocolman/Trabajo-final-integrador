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
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const [existingRows] = await conn.query(
                `SELECT id_especialidad, activo FROM especialidades WHERE UPPER(nombre) = UPPER(?) LIMIT 1 FOR UPDATE`,
                [normalizedNombre]
            );
            const existing = existingRows[0];

            if (existing?.activo === 1) {
                const duplicateError = new Error('Registro duplicado en nombre');
                duplicateError.code = 'ER_DUP_ENTRY';
                duplicateError.sqlMessage = "Duplicate entry for key 'nombre'";
                throw duplicateError;
            }

            let resultado;
            if (existing?.activo === 0) {
                await conn.query('UPDATE especialidades SET nombre = ?, activo = 1 WHERE id_especialidad = ?', [normalizedNombre, existing.id_especialidad]);
                resultado = { id: existing.id_especialidad, reactivated: true };
            } else {
                const [result] = await conn.query('INSERT INTO especialidades (nombre, activo) VALUES (?, 1)', [normalizedNombre]);
                resultado = { id: result.insertId, reactivated: false };
            }

            await conn.commit();
            return resultado;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
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
    },

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
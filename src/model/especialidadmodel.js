import pool from '../config/db.js';

// TODO: agregar métodos de lectura (getAll, getById) - Roberto
const especialidadModel = {
    
    create: async (nombre) => {
        const query = 'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)';
        try {
            const [result] = await pool.query(query, [nombre.toUpperCase()]);
            return result.insertId;
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
};

export default especialidadModel;
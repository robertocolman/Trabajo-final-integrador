import pool from '../config/db.js';
import obraSocialModel from '../model/obrasocialmodel.js';

const obraSocialService = {
    getAll: async () => {
        return await obraSocialModel.getAll();
    },

    getById: async (id) => {
        return await obraSocialModel.getById(id);
    },

   create: async (data) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const [existingRows] = await conn.query(
                'SELECT id_obra_social, activo FROM obras_sociales WHERE UPPER(nombre) = UPPER(?) LIMIT 1 FOR UPDATE',
                [data.nombre]
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
                await conn.query(
                    'UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?, activo = 1 WHERE id_obra_social = ?',
                    [data.nombre.toUpperCase(), data.descripcion, data.porcentaje_descuento, data.es_particular || 0, existing.id_obra_social]
                );
                resultado = { id: existing.id_obra_social, ...data, reactivated: true };
            } else {
                const [result] = await conn.query(
                    'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular, activo) VALUES (?, ?, ?, ?, 1)',
                    [data.nombre.toUpperCase(), data.descripcion, data.porcentaje_descuento, data.es_particular || 0]
                );
                resultado = { id: result.insertId, ...data, reactivated: false };
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
    
    update: async (id, data) => {
        const affected = await obraSocialModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await obraSocialModel.softDelete(id);
    }
};

export default obraSocialService;

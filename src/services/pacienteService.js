import pool from '../config/db.js';
import pacienteModel from '../model/pacientemodel.js';
import usuarioModel from '../model/usuariomodel.js';
import obraSocialModel from '../model/obrasocialmodel.js';

const pacienteService = {
    getAll: async () => {
        return await pacienteModel.getAll();
    },

    getById: async (id) => {
        return await pacienteModel.getById(id);
    },

   create: async (data) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const usuario = await usuarioModel.getById(data.id_usuario);
            if (!usuario) throw new Error('Usuario no encontrado o inactivo');

            const obraSocial = await obraSocialModel.getById(data.id_obra_social);
            if (!obraSocial) throw new Error('Obra social no encontrada o inactiva');

            const [result] = await conn.query(
                'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
                [data.id_usuario, data.id_obra_social]
            );

            await conn.commit();
            return { id: result.insertId, ...data };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    update: async (id, data) => {
        const affected = await pacienteModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await pacienteModel.softDelete(id);
    }
};

export default pacienteService;

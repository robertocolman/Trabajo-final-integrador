import pool from '../config/db.js';
import medicoModel from '../model/medicomodel.js';
import usuarioModel from '../model/usuariomodel.js';
import especialidadModel from '../model/especialidadmodel.js';

const medicoService = {
    getAll: async () => {
        return await medicoModel.getAll();
    },

    getById: async (id) => {
        return await medicoModel.getById(id);
    },

    create: async (data) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const usuario = await usuarioModel.getById(data.id_usuario);
            if (!usuario) throw new Error('Usuario no encontrado o inactivo');

            const especialidad = await especialidadModel.getById(data.id_especialidad);
            if (!especialidad) throw new Error('Especialidad no encontrada o inactiva');

            const [result] = await conn.query(
                'INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)',
                [data.id_usuario, data.id_especialidad, data.matricula, data.descripcion || null, data.valor_consulta]
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
        const affected = await medicoModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await medicoModel.softDelete(id);
    }
};

export default medicoService;

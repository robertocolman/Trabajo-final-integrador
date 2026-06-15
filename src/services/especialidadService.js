import especialidadModel from '../model/especialidadmodel.js';

const especialidadService = {
    getAll: async () => {
        return await especialidadModel.getAll();
    },

    getById: async (id) => {
        return await especialidadModel.getById(id);
    },

    create: async (nombre) => {
        const result = await especialidadModel.create(nombre);
        return {
            id: result.id,
            nombre: nombre.toUpperCase(),
            reactivada: result.reactivated
        };
    },

    update: async (id, nombre) => {
        const affected = await especialidadModel.update(id, nombre);
        return affected;
    },

    remove: async (id) => {
        return await especialidadModel.softDelete(id);
    }
};

export default especialidadService;

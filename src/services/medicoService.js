import medicoModel from '../model/medicomodel.js';

const medicoService = {
    getAll: async () => {
        return await medicoModel.getAll();
    },

    getById: async (id) => {
        return await medicoModel.getById(id);
    },

    create: async (data) => {
        const id = await medicoModel.create(data);
        return { id, ...data, nombre: data.nombre.toUpperCase(), apellido: data.apellido.toUpperCase() };
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

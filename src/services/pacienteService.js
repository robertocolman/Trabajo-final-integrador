import pacienteModel from '../model/pacientemodel.js';

const pacienteService = {
    getAll: async () => {
        return await pacienteModel.getAll();
    },

    getById: async (id) => {
        return await pacienteModel.getById(id);
    },

    create: async (data) => {
        const id = await pacienteModel.create(data);
        return { id, ...data };
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

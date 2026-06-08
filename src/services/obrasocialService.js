import obraSocialModel from '../model/obrasocialmodel.js';

const obraSocialService = {
    getAll: async () => {
        return await obraSocialModel.getAll();
    },

    getById: async (id) => {
        return await obraSocialModel.getById(id);
    },

    create: async (data) => {
        const id = await obraSocialModel.create(data);
        return { id, nombre: data.nombre.toUpperCase(), telefono: data.telefono || null };
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

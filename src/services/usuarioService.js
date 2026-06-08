import usuarioModel from '../model/usuariomodel.js';

const usuarioService = {
    getAll: async () => {
        return await usuarioModel.getAll();
    },

    getById: async (id) => {
        return await usuarioModel.getById(id);
    },

    create: async (data) => {
        const id = await usuarioModel.create(data);
        return { id, nombre: data.nombre.toUpperCase(), username: data.username, role: data.role || 'user' };
    },

    update: async (id, data) => {
        const affected = await usuarioModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await usuarioModel.softDelete(id);
    }
};

export default usuarioService;

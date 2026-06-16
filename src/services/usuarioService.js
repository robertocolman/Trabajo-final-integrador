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
        return { id, ...data };
    },

    update: async (id, data) => {
        const affected = await usuarioModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await usuarioModel.softDelete(id);
    }
    ,
    login: async ({ email, contrasenia }) => {
       const usuario = await usuarioModel.getByEmail(email);
       if (!usuario) throw new Error('Credenciales inválidas');
       if (usuario.contrasenia !== contrasenia) throw new Error('Credenciales inválidas');
       const { contrasenia: _, ...usuarioSinPass } = usuario;
       return usuarioSinPass;
    }
};

export default usuarioService;

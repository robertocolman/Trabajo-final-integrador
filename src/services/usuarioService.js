import usuarioModel from '../model/usuariomodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usuarioService = {
    getAll: async () => {
        return await usuarioModel.getAll();
    },

    getById: async (id) => {
        return await usuarioModel.getById(id);
    },

    create: async (data) => {

        const passwordHash = await bcrypt.hash(data.contrasenia, 10);

        const nuevoUsuario = {
            ...data,
            contrasenia: passwordHash
        };

        const id = await usuarioModel.create(nuevoUsuario);

        return {
            id,
            ...nuevoUsuario,
            contrasenia: undefined
        };
    },

    update: async (id, data) => {

        if (data.contrasenia) {
            data.contrasenia = await bcrypt.hash(data.contrasenia, 10);
        }

        const affected = await usuarioModel.update(id, data);
        return affected;
    },

    remove: async (id) => {
        return await usuarioModel.softDelete(id);
    },

    login: async ({ email, contrasenia }) => {

        const usuario = await usuarioModel.getByEmail(email);

        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }

        const passwordValida = await bcrypt.compare(
            contrasenia,
            usuario.contrasenia
        );

        if (!passwordValida) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                email: usuario.email,
                role: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        const { contrasenia: _, ...usuarioSinPass } = usuario;

        return {
            usuario: usuarioSinPass,
            token
        };
    }
};

export default usuarioService;

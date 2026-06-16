import pool from '../config/db.js';
import turnoModel from '../model/turnomodel.js';
import medicoModel from '../model/medicomodel.js';
import pacienteModel from '../model/pacientemodel.js';
import obraSocialModel from '../model/obrasocialmodel.js';

const turnoService = {
    getAll: async () => {
        return await turnoModel.getAll();
    },

    getById: async (id) => {
        return await turnoModel.getById(id);
    },

    getByMedico: async (id_medico) => {
        return await turnoModel.getByMedico(id_medico);
    },

    getByPaciente: async (id_paciente) => {
        return await turnoModel.getByPaciente(id_paciente);
    },

    create: async ({ id_paciente, id_medico, fecha_hora }) => {
        
        const medico = await medicoModel.getById(id_medico);
        if (!medico) throw new Error('Médico no encontrado o inactivo');

        const paciente = await pacienteModel.getById(id_paciente);
        if (!paciente) throw new Error('Paciente no encontrado o inactivo');

        const obraSocial = await obraSocialModel.getById(paciente.id_obra_social);
        if (!obraSocial) throw new Error('Obra social del paciente no válida');

        if (new Date(fecha_hora) < new Date()) {
            throw new Error('La fecha del turno no puede ser en el pasado');
        }

        const costoConsulta = parseFloat(medico.valor_consulta);
        let valorFinal;

        if (Number(obraSocial.es_particular) === 0) {
            const descuento = parseFloat(obraSocial.porcentaje_descuento) / 100;
            valorFinal = costoConsulta - (descuento * costoConsulta);
        } else {
            valorFinal = costoConsulta;
        }

        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const id_turno = await turnoModel.create({
                id_medico,
                id_paciente,
                id_obra_social: paciente.id_obra_social,
                fecha_hora,
                valor_total: valorFinal.toFixed(2)
            }, conn);

            await conn.commit();

            return {
                id_turno_reserva: id_turno,
                id_medico,
                id_paciente,
                id_obra_social: paciente.id_obra_social,
                fecha_hora,
                valor_total: parseFloat(valorFinal.toFixed(2)),
                atendido: 0
            };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    marcarAtendido: async (id) => {
        const turno = await turnoModel.getById(id);
        if (!turno) throw new Error('Turno no encontrado');
        if (turno.atendido === 1) throw new Error('El turno ya fue marcado como atendido');

        const affected = await turnoModel.marcarAtendido(id);
        return affected;
    },

    cancelar: async (id) => {
        const turno = await turnoModel.getById(id);
        if (!turno) throw new Error('Turno no encontrado');
        if (turno.atendido === 1) throw new Error('No se puede cancelar un turno ya atendido');

        return await turnoModel.softDelete(id);
    }
};

export default turnoService;

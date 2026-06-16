import pool from '../config/db.js';

const turnoModel = {
    getAll: async () => {
        const query = `
            SELECT tr.*,
                   u_p.apellido AS paciente_apellido, u_p.nombres AS paciente_nombres,
                   u_m.apellido AS medico_apellido, u_m.nombres AS medico_nombres,
                   e.nombre AS especialidad, os.nombre AS obra_social
            FROM turnos_reservas tr
            INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
            INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN medicos m ON tr.id_medico = m.id_medico
            INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
            WHERE tr.activo = 1
            ORDER BY tr.fecha_hora DESC
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `
            SELECT tr.*,
                   u_p.apellido AS paciente_apellido, u_p.nombres AS paciente_nombres,
                   u_m.apellido AS medico_apellido, u_m.nombres AS medico_nombres
            FROM turnos_reservas tr
            INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
            INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN medicos m ON tr.id_medico = m.id_medico
            INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            WHERE tr.id_turno_reserva = ? AND tr.activo = 1
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0] || null;
    },

    getByMedico: async (id_medico) => {
        const query = `
            SELECT tr.*,
                   u_p.apellido AS paciente_apellido, u_p.nombres AS paciente_nombres,
                   os.nombre AS obra_social
            FROM turnos_reservas tr
            INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
            INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
            WHERE tr.id_medico = ? AND tr.activo = 1
            ORDER BY tr.fecha_hora ASC
        `;
        const [rows] = await pool.query(query, [id_medico]);
        return rows;
    },

    getByPaciente: async (id_paciente) => {
        const query = `
            SELECT tr.*,
                   u_m.apellido AS medico_apellido, u_m.nombres AS medico_nombres,
                   e.nombre AS especialidad, os.nombre AS obra_social
            FROM turnos_reservas tr
            INNER JOIN medicos m ON tr.id_medico = m.id_medico
            INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
            WHERE tr.id_paciente = ? AND tr.activo = 1
            ORDER BY tr.fecha_hora DESC
        `;
        const [rows] = await pool.query(query, [id_paciente]);
        return rows;
    },

    create: async ({ id_medico, id_paciente, id_obra_social, fecha_hora, valor_total }, conn = null) => {
        const query = `
            INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
            VALUES (?, ?, ?, ?, ?, 0, 1)
        `;
        const executor = conn || pool;
        const [result] = await executor.query(query, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);
        return result.insertId;
    },

    marcarAtendido: async (id) => {
        const query = `
            UPDATE turnos_reservas SET atendido = 1
            WHERE id_turno_reserva = ? AND activo = 1 AND atendido = 0
        `;
        const [result] = await pool.query(query, [id]);
        return result.affectedRows;
    },

    softDelete: async (id) => {
        const query = 'UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ? AND activo = 1';
        const [result] = await pool.query(query, [id]);
        return result.affectedRows;
    }
};

export default turnoModel;

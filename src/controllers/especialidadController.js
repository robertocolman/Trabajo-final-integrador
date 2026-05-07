const pool = require('../config/db');

exports.getAllEspecialidades = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM especialidades WHERE activo = 1');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.getEspecialidadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Especialidad no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.createEspecialidad = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query('INSERT INTO especialidades (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (error) {
    next(error);
  }
};

exports.updateEspecialidad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const [result] = await pool.query('UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1', [nombre, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Especialidad no encontrada o inactiva' });
    }
    res.json({ id, nombre });
  } catch (error) {
    next(error);
  }
};

exports.deleteEspecialidad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Especialidad no encontrada o ya inactiva' });
    }
    res.json({ message: 'Especialidad eliminada' });
  } catch (error) {
    next(error);
  }
};

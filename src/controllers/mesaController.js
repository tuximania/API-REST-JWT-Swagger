import { query } from '../config/database.js';

export const listarMesas = async (req, res) => {
  try {
    const disponible = req.query.disponible;
    let sql = 'SELECT id, numero, capacidad, ubicacion, activa AS disponible FROM mesas WHERE activa = true';
    const params = [];

    if (disponible !== undefined) {
      sql += ' AND activa = $1';
      params.push(disponible === 'true');
    }

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('Error al listar mesas:', error);
    return res.status(500).json({ message: 'Error al listar mesas' });
  }
};

export const obtenerMesa = async (req, res) => {
  try {
    const result = await query('SELECT id, numero, capacidad, ubicacion, activa AS disponible FROM mesas WHERE id = $1 AND activa = true', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mesa no encontrada' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener mesa:', error);
    return res.status(500).json({ message: 'Error al obtener mesa' });
  }
};

export const crearMesa = async (req, res) => {
  const { numero, capacidad, ubicacion, disponible = true } = req.body || {};

  if (!numero || !capacidad) {
    return res.status(400).json({ message: 'numero y capacidad son obligatorios' });
  }

  try {
    const result = await query(
      'INSERT INTO mesas (numero, capacidad, ubicacion, activa) VALUES ($1, $2, $3, $4) RETURNING id, numero, capacidad, ubicacion, activa AS disponible',
      [numero, capacidad, ubicacion || null, disponible]
    );

    return res.status(201).json({ message: 'Mesa creada correctamente', mesa: result.rows[0] });
  } catch (error) {
    console.error('Error al crear mesa:', error);
    return res.status(500).json({ message: 'Error al crear mesa' });
  }
};

export const actualizarMesa = async (req, res) => {
  const { numero, capacidad, ubicacion, disponible } = req.body || {};

  try {
    const result = await query(
      'UPDATE mesas SET numero = COALESCE($1, numero), capacidad = COALESCE($2, capacidad), ubicacion = COALESCE($3, ubicacion), activa = COALESCE($4, activa) WHERE id = $5 AND activa = true RETURNING id, numero, capacidad, ubicacion, activa AS disponible',
      [numero ?? null, capacidad ?? null, ubicacion ?? null, disponible ?? null, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mesa no encontrada o ya eliminada' });
    }

    return res.json({ message: 'Mesa actualizada correctamente', mesa: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar mesa:', error);
    return res.status(500).json({ message: 'Error al actualizar mesa' });
  }
};

export const desactivarMesa = async (req, res) => {
  try {
    const result = await query(
      'UPDATE mesas SET activa = false WHERE id = $1 AND activa = true RETURNING id, numero, capacidad, ubicacion, activa AS disponible',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mesa no encontrada' });
    }

    return res.json({ message: 'Mesa desactivada correctamente', mesa: result.rows[0] });
  } catch (error) {
    console.error('Error al desactivar mesa:', error);
    return res.status(500).json({ message: 'Error al desactivar mesa' });
  }
};

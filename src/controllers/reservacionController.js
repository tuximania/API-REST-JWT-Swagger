import { query } from '../config/database.js';

export const crearReservacion = async (req, res) => {
  const { mesa_id, fecha, hora, comensales } = req.body || {};

  if (!mesa_id || !fecha || !hora || !comensales) {
    return res.status(400).json({ message: 'mesa_id, fecha, hora y comensales son obligatorios' });
  }

  try {
    const mesaResult = await query('SELECT id, activa FROM mesas WHERE id = $1', [mesa_id]);
    if (mesaResult.rows.length === 0 || !mesaResult.rows[0].activa) {
      return res.status(409).json({ message: 'La mesa no está disponible para reservar' });
    }

    const conflict = await query(
      'SELECT id FROM reservaciones WHERE mesa_id = $1 AND fecha = $2 AND hora = $3 AND estado <> $4',
      [mesa_id, fecha, hora, 'cancelada']
    );

    if (conflict.rows.length > 0) {
      return res.status(409).json({ message: 'La mesa ya tiene una reservación para ese horario' });
    }

    const result = await query(
      'INSERT INTO reservaciones (usuario_id, mesa_id, fecha, hora, num_comensales, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, usuario_id, mesa_id, fecha, hora, num_comensales AS comensales, estado',
      [req.user.id, mesa_id, fecha, hora, comensales, 'pendiente']
    );

    return res.status(201).json({ message: 'Reservación creada correctamente', reservacion: result.rows[0] });
  } catch (error) {
    console.error('Error al crear reservación:', error);
    return res.status(500).json({ message: 'Error al crear la reservación' });
  }
};

export const misReservaciones = async (req, res) => {
  try {
    const result = await query(
      `SELECT r.id, r.fecha, r.hora, r.num_comensales AS comensales, r.estado, m.numero AS mesa_numero, m.ubicacion AS mesa_ubicacion
       FROM reservaciones r
       JOIN mesas m ON m.id = r.mesa_id
       WHERE r.usuario_id = $1
       ORDER BY r.fecha DESC, r.hora DESC`,
      [req.user.id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error('Error al listar mis reservaciones:', error);
    return res.status(500).json({ message: 'Error al listar mis reservaciones' });
  }
};

export const listarReservaciones = async (req, res) => {
  try {
    const result = await query(
      `SELECT r.id, r.fecha, r.hora, r.num_comensales AS comensales, r.estado, u.nombre AS cliente, m.numero AS mesa_numero
       FROM reservaciones r
       JOIN usuarios u ON u.id = r.usuario_id
       JOIN mesas m ON m.id = r.mesa_id
       ORDER BY r.fecha DESC, r.hora DESC`
    );

    return res.json(result.rows);
  } catch (error) {
    console.error('Error al listar reservaciones:', error);
    return res.status(500).json({ message: 'Error al listar reservaciones' });
  }
};

export const cambiarEstadoReservacion = async (req, res) => {
  const { estado } = req.body || {};

  if (!estado) {
    return res.status(400).json({ message: 'estado es obligatorio' });
  }

  try {
    const result = await query(
      'UPDATE reservaciones SET estado = $1 WHERE id = $2 RETURNING id, estado',
      [estado.toLowerCase(), req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }

    return res.json({ message: 'Estado actualizado correctamente', reservacion: result.rows[0] });
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    return res.status(500).json({ message: 'Error al cambiar estado' });
  }
};

export const cancelarReservacion = async (req, res) => {
  try {
    const existing = await query('SELECT usuario_id FROM reservaciones WHERE id = $1', [req.params.id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }

    if (existing.rows[0].usuario_id !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'No puedes cancelar una reservación que no te pertenece' });
    }

    const result = await query(
      'UPDATE reservaciones SET estado = $1 WHERE id = $2 RETURNING id, estado',
      ['cancelada', req.params.id]
    );

    return res.json({ message: 'Reservación cancelada correctamente', reservacion: result.rows[0] });
  } catch (error) {
    console.error('Error al cancelar reservación:', error);
    return res.status(500).json({ message: 'Error al cancelar reservación' });
  }
};

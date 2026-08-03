export const crearReservacion = async (req, res) => {
  res.status(201).json({ message: 'Crear reservación pendiente de implementación' });
};

export const misReservaciones = async (req, res) => {
  res.json({ message: 'Mis reservaciones pendiente de implementación' });
};

export const listarReservaciones = async (req, res) => {
  res.json({ message: 'Listar reservaciones pendiente de implementación' });
};

export const cambiarEstadoReservacion = async (req, res) => {
  res.json({ message: 'Cambiar estado de reservación pendiente de implementación', id: req.params.id });
};

export const cancelarReservacion = async (req, res) => {
  res.json({ message: 'Cancelar reservación pendiente de implementación', id: req.params.id });
};

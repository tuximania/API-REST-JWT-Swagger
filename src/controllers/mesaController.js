export const listarMesas = async (req, res) => {
  res.json({ message: 'Listar mesas pendiente de implementación' });
};

export const obtenerMesa = async (req, res) => {
  res.json({ message: 'Detalle de mesa pendiente de implementación', id: req.params.id });
};

export const crearMesa = async (req, res) => {
  res.status(201).json({ message: 'Crear mesa pendiente de implementación' });
};

export const actualizarMesa = async (req, res) => {
  res.json({ message: 'Actualizar mesa pendiente de implementación', id: req.params.id });
};

export const desactivarMesa = async (req, res) => {
  res.json({ message: 'Desactivar mesa pendiente de implementación', id: req.params.id });
};

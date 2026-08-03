export const register = async (req, res) => {
  res.status(201).json({ message: 'Registro de usuario pendiente de implementación' });
};

export const login = async (req, res) => {
  res.json({ message: 'Inicio de sesión pendiente de implementación' });
};

export const perfil = async (req, res) => {
  res.json({ user: req.user });
};

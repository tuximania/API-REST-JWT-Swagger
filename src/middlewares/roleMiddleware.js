export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Acceso denegado. Requiere rol Admin.' });
  }
  next();
};

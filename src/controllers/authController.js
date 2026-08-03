import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

const normalizeRole = (value) => {
  if (!value) return 'Cliente';
  return value.toLowerCase() === 'admin' ? 'Admin' : 'Cliente';
};

const dbRole = (value) => (value === 'Admin' ? 'admin' : 'cliente');

const signToken = (user) => jwt.sign(
  { id: user.id, email: user.email, role: normalizeRole(user.rol || user.role) },
  process.env.JWT_SECRET || 'secret',
  { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
);

export const register = async (req, res) => {
  const { nombre, email, password, rol = 'Cliente' } = req.body || {};

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'nombre, email y password son obligatorios' });
  }

  try {
    const existing = await query('SELECT id FROM usuarios WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
      [nombre, email.toLowerCase(), passwordHash, dbRole(rol)]
    );

    const user = result.rows[0];
    const token = signToken(user);

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: { id: user.id, nombre: user.nombre, email: user.email, role: normalizeRole(user.rol) },
      token,
    });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email y password son obligatorios' });
  }

  try {
    const result = await query(
      'SELECT id, nombre, email, password_hash, rol FROM usuarios WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = signToken(user);

    return res.json({
      message: 'Login exitoso',
      user: { id: user.id, nombre: user.nombre, email: user.email, role: normalizeRole(user.rol) },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const perfil = async (req, res) => {
  try {
    const result = await query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [req.user?.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    return res.json({ user: { id: user.id, nombre: user.nombre, email: user.email, role: normalizeRole(user.rol) } });
  } catch (error) {
    console.error('Error en perfil:', error);
    return res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

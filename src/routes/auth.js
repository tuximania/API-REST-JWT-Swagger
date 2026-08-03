import { Router } from 'express';
import { register, login, perfil } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               rol: { type: string, enum: [Cliente, Admin] }
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/register', register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/login', login);

/**
 * @openapi
 * /api/auth/perfil:
 *   get:
 *     summary: Obtener datos del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 */
router.get('/perfil', verifyToken, perfil);

export default router;

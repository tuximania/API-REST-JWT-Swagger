import { Router } from 'express';
import { crearReservacion, misReservaciones, listarReservaciones, cambiarEstadoReservacion, cancelarReservacion } from '../controllers/reservacionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/roleMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/reservaciones:
 *   post:
 *     summary: Crear una nueva reservación para el usuario autenticado
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reservación creada
 */
router.post('/', verifyToken, crearReservacion);

/**
 * @openapi
 * /api/reservaciones/mis:
 *   get:
 *     summary: Listar las reservaciones del usuario autenticado
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservaciones del usuario
 */
router.get('/mis', verifyToken, misReservaciones);

/**
 * @openapi
 * /api/reservaciones:
 *   get:
 *     summary: Listar todas las reservaciones (solo Admin)
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reservaciones
 */
router.get('/', verifyToken, requireAdmin, listarReservaciones);

/**
 * @openapi
 * /api/reservaciones/{id}/estado:
 *   put:
 *     summary: Cambiar el estado de una reservación (solo Admin)
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.put('/:id/estado', verifyToken, requireAdmin, cambiarEstadoReservacion);

/**
 * @openapi
 * /api/reservaciones/{id}:
 *   delete:
 *     summary: Cancelar una reservación propia o administrativamente
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservación cancelada
 */
router.delete('/:id', verifyToken, cancelarReservacion);

export default router;

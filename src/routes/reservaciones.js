import { Router } from 'express';
import { crearReservacion, misReservaciones, listarReservaciones, cambiarEstadoReservacion, cancelarReservacion } from '../controllers/reservacionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/roleMiddleware.js';

const router = Router();

router.post('/', verifyToken, crearReservacion);
router.get('/mis', verifyToken, misReservaciones);
router.get('/', verifyToken, requireAdmin, listarReservaciones);
router.put('/:id/estado', verifyToken, requireAdmin, cambiarEstadoReservacion);
router.delete('/:id', verifyToken, cancelarReservacion);

export default router;

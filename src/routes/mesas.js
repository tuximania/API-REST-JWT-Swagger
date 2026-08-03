import { Router } from 'express';
import { listarMesas, obtenerMesa, crearMesa, actualizarMesa, desactivarMesa } from '../controllers/mesaController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/', listarMesas);
router.get('/:id', obtenerMesa);
router.post('/', verifyToken, requireAdmin, crearMesa);
router.put('/:id', verifyToken, requireAdmin, actualizarMesa);
router.delete('/:id', verifyToken, requireAdmin, desactivarMesa);

export default router;

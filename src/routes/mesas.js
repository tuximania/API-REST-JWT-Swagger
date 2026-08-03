import { Router } from 'express';
import { listarMesas, obtenerMesa, crearMesa, actualizarMesa, desactivarMesa } from '../controllers/mesaController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/roleMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/mesas:
 *   get:
 *     summary: Listar mesas disponibles
 *     tags: [Mesas]
 *     parameters:
 *       - in: query
 *         name: disponible
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: Lista de mesas
 */
router.get('/', listarMesas);

/**
 * @openapi
 * /api/mesas/{id}:
 *   get:
 *     summary: Obtener una mesa por ID
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle de la mesa
 */
router.get('/:id', obtenerMesa);

/**
 * @openapi
 * /api/mesas:
 *   post:
 *     summary: Crear una nueva mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Mesa creada
 */
router.post('/', verifyToken, requireAdmin, crearMesa);

/**
 * @openapi
 * /api/mesas/{id}:
 *   put:
 *     summary: Actualizar una mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mesa actualizada
 */
router.put('/:id', verifyToken, requireAdmin, actualizarMesa);

/**
 * @openapi
 * /api/mesas/{id}:
 *   delete:
 *     summary: Desactivar una mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mesa desactivada
 */
router.delete('/:id', verifyToken, requireAdmin, desactivarMesa);

export default router;

import { Router } from 'express';
import { register, login, perfil } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verifyToken, perfil);

export default router;

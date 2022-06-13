import { Router } from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import adminRoutes from './admin';

const router = Router();
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin/book', adminRoutes);

export default router;

import express from 'express';
import tasksRoutes from './tasks.routes';
import userRoutes from './user.routes';
const router = express.Router();

router.use('/tasks', tasksRoutes);
router.use('/user', userRoutes);

export default router;

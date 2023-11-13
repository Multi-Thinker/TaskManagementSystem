import { Router } from 'express';
import { authenticateJWT } from '../middleware/jwt.middleware';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/tasks.controller';
const validator = require('express-joi-validation').createValidator({});
import Joi from 'joi';
const router = Router();

const TaskJOI = validator.body(
  Joi.object({
    title: Joi.string().required(),
    isDone: Joi.boolean().optional().valid(true, false).default(false),
    taskType: Joi.string().optional().valid('todo', 'reminder').default('todo'),
  }),
);

const TaskParamsJOI = validator.params(
  Joi.object({ id: Joi.string().uuid().required() }),
);

router.post('/', authenticateJWT, TaskJOI, createTask);
router.put('/:id', authenticateJWT, TaskParamsJOI, TaskJOI, updateTask);
router.delete('/:id', authenticateJWT, TaskParamsJOI, deleteTask);
router.get('/', authenticateJWT, getAllTasks);
router.get('/:id', authenticateJWT, TaskParamsJOI, getTask);

export default router;

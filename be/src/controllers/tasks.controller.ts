import { Request, Response } from 'express';
import TasksModel from '../models/tasks.model';
import httpStatus from 'http-status';
import client from '../utils/redis';
import Logger from '../utils/Logger';
import TasksFactory from '../utils/TaskFactory';
const logger = Logger.getInstance();
const TaskFactory = new TasksFactory();

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, isDone, taskType } = req.body;
    const userId = req.userId;
    const Task = await TaskFactory.createTask(taskType, { title, isDone, userId });
    await client.del(`user:${userId}:Tasks`);
    res.status(httpStatus.OK).json(Task);
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while creating the Task.' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, isDone, taskType } = req.body;
    const TaskId = req.params.id;
    const userId = req.userId;

    const updatedTask = await TaskFactory.updateTask(taskType, {
      title,
      isDone,
      taskType,
      userId,
      TaskId,
    });

    if (updatedTask[0] === 0) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Task not found or you do not have access.' });
    } else {
      await client.del(`user:${userId}:Tasks`);
      await client.del(`Task:${TaskId}`);
      res.status(httpStatus.OK).json({ message: 'Task updated successfully.' });
    }
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while updating the Task.' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const TaskId = req.params.id;
    const userId = req.userId;
    const deletedTask = await TasksModel.destroy({
      where: { id: TaskId, userId },
    });

    if (!deletedTask) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Task not found or you do not have access.' });
    } else {
      await client.del(`Task:${TaskId}`);
      await client.del(`user:${userId}:Tasks`);
      res.status(httpStatus.OK).json({ message: 'Task deleted successfully.' });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while deleting the Task.' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const TaskId = req.params.id;
    const userId = req.userId;

    const cachedTask = await client.get(`Task:${TaskId}`);
    if (cachedTask) {
      res.json(JSON.parse(cachedTask));
    } else {
      const Task = await TasksModel.findOne({
        where: { id: TaskId, userId },
      });

      if (!Task) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ error: 'Task not found or you do not have access.' });
      } else {
        await client.set(`Task:${TaskId}`, JSON.stringify(Task));
        res.json(Task);
      }
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching the Task.' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const cachedTasks = await client.get(`user:${userId}:Tasks`);
    if (cachedTasks) {
      res.json(JSON.parse(cachedTasks));
    } else {
      const Tasks = await TasksModel.findAll({ where: { userId } });
      await client.set(`user:${userId}:Tasks`, JSON.stringify(Tasks));
      res.status(httpStatus.OK).json(Tasks);
    }
  } catch (error) {
    logger.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching the Tasks.' });
  }
};

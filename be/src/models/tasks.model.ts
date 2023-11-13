import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import UserModel from './user.model';
import TaskInstance from '../types/tasks.type';

const TasksModel = sequelize.define<TaskInstance>(
  'Tasks',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'todo',
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true },
);

UserModel.hasMany(TasksModel, { as: 'tasks', foreignKey: 'userId' });
TasksModel.belongsTo(UserModel, { foreignKey: 'userId' });

abstract class Task {
  abstract save(props): void;
  abstract update(props): void;
}

export class TodoTask extends Task {
  constructor(private data: any) {
    super();
  }

  async save(props) {
    return await TasksModel.create({ ...props, taskType: 'todo' });
  }
  async update(props) {
    const { title, isDone, userId, TaskId } = props;
    const updatedTask = await TasksModel.update(
      { title, isDone, taskType: 'todo' },
      { where: { id: TaskId, userId } },
    );
    return updatedTask;
  }
}

export class ReminderTask extends Task {
  constructor(private data: any) {
    super();
  }

  async save(props) {
    return await TasksModel.create({ ...props, taskType: 'reminder' });
  }
  async update(props) {
    const { title, isDone, userId, TaskId } = props;
    const updatedTask = await TasksModel.update(
      { title, isDone, taskType: 'reminder' },
      { where: { id: TaskId, userId } },
    );
    return updatedTask;
  }
}

export default TasksModel;

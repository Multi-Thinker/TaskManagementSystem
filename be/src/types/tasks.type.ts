import { Model } from 'sequelize';

interface TaskType {
  id?: string;
  title: string;
  taskType?: "todo" | "reminder";
  isDone?: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface TaskInstance extends Model<TaskType>, TaskType {}

export default TaskInstance;

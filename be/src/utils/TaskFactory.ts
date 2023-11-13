import { ReminderTask, TodoTask } from '../models/tasks.model';

class TaskFactory {
  createTask(type: 'todo' | 'reminder', data: any) {
    switch (type) {
      case 'todo':
        const textTaskSave = new TodoTask(data);
        return textTaskSave.save(data);
      case 'reminder':
        const imageTaskSave = new ReminderTask(data);
        return imageTaskSave.save(data);
      default:
        throw new Error(`Unsupported Task type: ${type}`);
    }
  }
  updateTask(type: 'todo' | 'reminder', data: any) {
    switch (type) {
      case 'todo':
        const textTaskSave = new TodoTask(data);
        return textTaskSave.update(data);
      case 'reminder':
        const imageTaskSave = new ReminderTask(data);
        return imageTaskSave.update(data);
      default:
        throw new Error(`Unsupported Task type: ${type}`);
    }
  }
}

export default TaskFactory;

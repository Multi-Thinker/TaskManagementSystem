import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import http from "../utils/http";
import { HttpStatusCode } from "axios";
import { list } from "../../types/lists";

interface Tasks {
  taskList: list[];
  getTask: (id: string) => Promise<any>;
  getTasks: () => Promise<any>;
  createTask: (title: string) => Promise<any>;
  editTask: ({
    id,
    title,
    isDone = false,
  }: {
    id: string;
    title?: string;
    isDone?: boolean;
  }) => Promise<any>;
  deleteTask: (id: string) => Promise<any>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const TaskContext = createContext<Tasks>({
  taskList: [],
  getTask: async (id: string) => null,
  getTasks: async () => null,
  createTask: async (title: string) => null,
  editTask: async ({
    id,
    title,
    isDone = false,
  }: {
    id: string;
    title?: string;
    isDone?: boolean;
  }) => null,
  deleteTask: async (id: string) => null,
  loading: true,
  setLoading: () => null,
});

export const TaskProvider = ({
  children,
}: {
  children?: React.ReactElement;
}) => {
  const [taskList, setTaskList] = useState<list[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTask = async (id: string) => {
    const { data, status } = await http.get(`tasks/${id}`);
    return { data, status };
  };

  const getTasks = async () => {
    const { data, status } = await http.get(`tasks/`);
    if (status === HttpStatusCode.Ok) {
      setTaskList(data);
    }
    return { data, status };
  };

  const createTask = async (title: string) => {
    setLoading(true);
    const { data, status } = await http.post(`tasks/`, {
      title,
      isDone: false,
    });
    const newList = [...taskList];
    newList.push({ title, completed: false, id: data.id });
    setTaskList(newList as unknown as list[]);
    setLoading(false);
    return { data, status };
  };

  const deleteTask = async (id: string) => {
    if (!id) return;
    setLoading(true);
    const { data, status } = await http.delete(`tasks/${id}`);
    setTaskList(taskList.filter((e) => e.id !== id));
    setLoading(false);
    return { data, status };
  };

  const editTask = async ({
    id,
    title,
    isDone = false,
  }: {
    id: string;
    title?: string;
    isDone?: boolean;
  }) => {
    if (!id) return;
    const { data, status } = await http.put(`tasks/${id}`, { title, isDone });
    const newTasks = taskList?.map((task) => {
      if (task.id === id) {
        return { id, title, completed: isDone };
      } else {
        return task;
      }
    });
    setTaskList(newTasks as list[]);
    return { data, status };
  };

  useEffect(() => {
    getTasks().then(({ data, status }) => {
      if (status === HttpStatusCode.Ok) {
        const transform = data.map(
          (tempList: { title: string; isDone: boolean; id: string }) => {
            return {
              id: tempList.id,
              title: tempList.title,
              completed: tempList.isDone,
            };
          }
        );
        setTaskList(transform);
        setLoading(false);
      }
    });
  }, []);

  return (
    <TaskContext.Provider
      value={{
        taskList,
        getTask,
        getTasks,
        editTask,
        deleteTask,
        createTask,
        loading,
        setLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

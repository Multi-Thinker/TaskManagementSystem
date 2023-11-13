import DashboardTopRow from "./DashboardTopRow";
import TaskEntry from "./TaskEntry";
import DashboardWidhoutRecords from "./DashboardWithoutRecords";
import { useTasks } from "../hooks/use-tasks";
import { useEffect, useState } from "react";
import AddOrUpdateTask from "./AddOrUpdateTask";
import DashboardControls from "./DashboardControls";

const DashboardWithRecords = () => {
  const defaultTaskState = {
    title: "",
    isDone: false,
    id: "",
  };
  const { loading, taskList, createTask, editTask } = useTasks();
  const [lists, setLists] = useState(taskList);
  const [addNewPopupVisibility, setAddNewPopupVisibility] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState("");
  const [updateTask, setUpdateTask] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(defaultTaskState);
  const [noRecordPopup, setNoRecordPopup] = useState(true);

  const resetAddOrUpdate = () => {
    setTaskToUpdate(defaultTaskState);
    setUpdateTask(false);
    setNewTaskText("");
  };
  const showAddPopup = (reset = true) => {
    reset && resetAddOrUpdate();
    setNoRecordPopup(false);
    setAddNewPopupVisibility(true);
  };
  const hideAddPopup = () => {
    setNoRecordPopup(true);
    if (updateTask) {
      resetAddOrUpdate();
    }
    setAddNewPopupVisibility(false);
  };

  const handleSearch = ({
    target: { value: search },
  }: {
    target: { value: string };
  }) => {
    setLists(
      taskList.filter((e) => {
        return e.title.toLocaleLowerCase().includes(search);
      })
    );
  };
  const handleCreateOrUpdate = async () => {
    setError("");
    if (newTaskText.length <= 3 || newTaskText.length > 50) {
      setError("need to be >4 and <50");
      return;
    }
    let promiseAction;
    if (!updateTask) {
      promiseAction = createTask(newTaskText);
    } else {
      promiseAction = editTask(taskToUpdate);
    }

    promiseAction.finally(() => hideAddPopup());
  };
  const handleEdit = (list: typeof defaultTaskState) => {
    setNewTaskText(list.title);
    setUpdateTask(true);
    setTaskToUpdate(list);
    showAddPopup(false);
  };
  useEffect(() => {
    setLists(taskList);
  }, [taskList]);

  return (
    <>
      {addNewPopupVisibility && (
        <AddOrUpdateTask
          {...{
            hideAddPopup,
            updateTask,
            taskToUpdate,
            handleCreateOrUpdate,
            setTaskToUpdate,
            setNewTaskText,
            error,
          }}
        />
      )}
      {!loading && taskList.length === 0 ? (
        <DashboardWidhoutRecords
          handleClick={showAddPopup}
          isShown={noRecordPopup}
        />
      ) : (
        <>
          <DashboardTopRow loading={loading} />
          <DashboardControls {...{ loading, handleSearch, showAddPopup }} />
          <TaskEntry lists={lists} handleEdit={handleEdit} />
        </>
      )}
    </>
  );
};

export default DashboardWithRecords;

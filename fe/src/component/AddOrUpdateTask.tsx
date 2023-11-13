import { Button, Input } from "./Inputs";
import Popup from "./Popup";
import { Heading } from "./Typography";

const AddOrUpdateTask = ({
  hideAddPopup,
  updateTask,
  taskToUpdate,
  handleCreateOrUpdate,
  setTaskToUpdate,
  setNewTaskText,
  error,
}: {
  hideAddPopup: () => void;
  updateTask: boolean;
  taskToUpdate: { title: string; isDone: boolean; id: string };
  handleCreateOrUpdate: () => void;
  setTaskToUpdate: (props: any) => void;
  setNewTaskText: (props: any) => void;
  error: string;
}) => {
  return (
    <>
      <Popup handleBackdrop={hideAddPopup} height="193px">
        <>
          <div className="pt-0">
            <Heading>{updateTask ? "~ Update" : "+ New"} Task</Heading>
            <Input
              placeholder="Task Name"
              defaultValue={updateTask ? taskToUpdate.title : ""}
              onKeyDown={({ key }) => key === "Enter" && handleCreateOrUpdate()}
              onChange={({ target: { value } }) => {
                if (updateTask) {
                  setTaskToUpdate({ ...taskToUpdate, title: value });
                } else {
                  setNewTaskText(value);
                }
              }}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
            <Button onClick={handleCreateOrUpdate}>
              {updateTask ? "~ Update" : "+ New"} Task
            </Button>
          </div>
        </>
      </Popup>
    </>
  );
};

export default AddOrUpdateTask;

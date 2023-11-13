import Image from "next/image";
import { list } from "../../types/lists";
import { useTasks } from "../hooks/use-tasks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Heading } from "./Typography";

const TaskEntry = ({
  lists,
  handleEdit,
}: {
  lists: list[];
  handleEdit: (list: any) => any;
}) => {
  const { editTask, loading, setLoading, deleteTask } = useTasks();
  const handleToggle = async ({
    id,
    completed,
    title,
  }: {
    id?: string;
    completed: boolean;
    title: string;
  }) => {
    setLoading(true);
    await editTask({ id: id ?? "", isDone: !completed, title });
    setLoading(false);
  };

  return (
    <>
      <div className="bg-white relative rounded-md shadow-[#00000014] shadow-md px-[24px] pb-[20px] block w-auto lg:mt-0 mt-[70px]">
        {lists.length > 0 ? (
          <>
            {loading && (
              <>
                <div className="opacity-10 cursor-progress top-0 left-0 block absolute h-full w-full bg-black rounded-md">
                  <Skeleton
                    className="opacity-100 top-0 left-0 block absolute h-full"
                    baseColor="gray"
                  />
                </div>
              </>
            )}
            {lists.map((list, k) => {
              return (
                <div
                  key={`${k}_listEntry`}
                  className={`entry ${
                    k + 1 != lists.length ? "border-b-2" : ""
                  } min-h-[70px] h-full pt-[43px] flex flex-row justify-between`}
                >
                  <div className="flex flex-row gap-x-2 h-[18px]">
                    <div className="checkboxContainer cursor-pointer">
                      <input
                        type="checkbox"
                        checked={list.completed}
                        onClick={() => {
                          handleToggle(list);
                        }}
                        className="checkboxinput cursor-pointer"
                      />
                      <div className="checkbox-overlay cursor-pointer"></div>
                    </div>
                    <div className="title min-h-[18px] h-[18px] leading-[18px] max-w-[400px] pr-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <span
                        className={`text-button text-[20px] ${
                          list.completed ? "striked" : ""
                        }`}
                      >
                        {list.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-start gap-x-2 leading-[18px] min-h-[18px]">
                    <Image
                      src="pen-solid.svg"
                      width={16}
                      height={16}
                      alt="edit"
                      className=" cursor-pointer"
                      onClick={() =>
                        handleEdit({ ...list, isDone: list.completed })
                      }
                    />
                    <Image
                      src="trash-solid.svg"
                      width={16}
                      height={16}
                      alt="delete"
                      className=" cursor-pointer"
                      onClick={() => deleteTask(list.id ?? "")}
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="p-2 text-center pt-[43px]">
            <Heading>Nothing Found</Heading>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskEntry;

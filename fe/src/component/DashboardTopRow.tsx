import DashboardCard from "./DashboardCard";
import MiniListCard from "./MiniListCard";
import TaskCard from "./TaskCard";
import PieChart from "./PieChart";
import { useTasks } from "../hooks/use-tasks";

const DashboardTopRow = ({ loading = false }: { loading: boolean }) => {
  const { taskList: lists } = useTasks();
  const completed = lists.filter((list) => list.completed).length;
  const total = lists.length;
  return (
    <div className="lg:flex block sm:gap-x-4 gap-y-4">
      <DashboardCard heading={"Tasks Completed"} loading={loading}>
        <TaskCard completed={completed.toString()} total={total.toString()} />
      </DashboardCard>
      <DashboardCard heading="Latest Created Tasks" loading={loading}>
        <MiniListCard lists={lists} />
      </DashboardCard>
      <DashboardCard loading={loading}>
        <PieChart total={total} completed={completed} />
      </DashboardCard>
    </div>
  );
};

export default DashboardTopRow;

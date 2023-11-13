const TaskCardTypography = (props: React.HTMLAttributes<any>) => (
  <div className={`px-0 mx-0 h-[64ppx] ${props?.className}`}>
    {props.children}
  </div>
);
const TaskCard = ({
  completed,
  total,
}: {
  completed: string;
  total: string;
}) => {
  return (
    <>
      <div className="flex justify-start">
        <TaskCardTypography className="text-button text-[64px]">
          {completed}
        </TaskCardTypography>
        <TaskCardTypography className="text-bullets leading-[120px] text-[20px]">
          /{total}
        </TaskCardTypography>
      </div>
    </>
  );
};
export default TaskCard;

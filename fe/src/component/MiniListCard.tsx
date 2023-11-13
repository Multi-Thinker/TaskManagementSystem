const MiniListCard = ({
  lists,
}: {
  lists: { title: string; completed: boolean }[];
}) => {
  return (
    <div className="flex justify-start">
      <ul className="list-disc text-bullets pl-[14px]">
        {lists.slice(0, 3).map((list, k) => (
          <li
            key={`${k}_miniListCard`}
            className={list.completed ? "striked" : ""}
          >
            {list.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniListCard;

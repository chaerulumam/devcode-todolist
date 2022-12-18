import { useEffect, useState } from "react";
import { useActivities } from "../../context/activities-context";
import SortDropdown from "./SortDropdown";

const SortButton = ({ groupId, item, setTodoItem }) => {
  const [selected, setSelected] = useState("latest");
  const [isActive, setIsActive] = useState(false);
  const { sortTodo } = useActivities();

  useEffect(() => {
    if (item) setTodoItem(sortTodo(selected, item));
  });

  const handleActive = () => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <div className="sort-container">
      <span
        className="sort-icon"
        onClick={handleActive}
        data-cy="todo-sort-button"
      ></span>
      <SortDropdown
        selected={selected}
        setSelected={setSelected}
        setIsActive={setIsActive}
        isActive={isActive}
      />
    </div>
  );
};

export default SortButton;

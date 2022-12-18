import { useEffect, useState, memo } from "react";
import { useActivities } from "../../context/activities-context";

const ListItem = memo(({ item, onOpenModal, onEditModal, setIsEdit, groupId }) => {
  const [isChecked, setIsChecked] = useState(item.is_active);
  const { updateTodoStatus } = useActivities();

  useEffect(() => {
    updateTodoStatus(item.id, groupId, { is_active: isChecked });
  }, [isChecked]);

  const handleChecked = () => {
    setIsChecked((prevValue) => !prevValue);
  };

  return (
    <div className="container" data-cy="todo-item">
      <div className="list-item">
        <div className="left-content">
          <input
            data-cy="todo-item-checkbox"
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={!isChecked}
            onChange={handleChecked}
          />
          <span
            className={`priority-icon ${item.priority}`}
            data-cy="todo-item-priority-indicator"
          ></span>
          <span data-cy="todo-item-title" className="todo-item-title">
            {item.title}
          </span>
          <span
            data-cy="todo-item-edit-button"
            className="edit-icon"
            onClick={() => {
              setIsEdit(true);
              onEditModal();
            }}
          ></span>
        </div>
        <span
          data-cy="todo-item-delete-button"
          className="trash-icon"
          onClick={onOpenModal}
        ></span>
      </div>
    </div>
  );
});

export default ListItem;

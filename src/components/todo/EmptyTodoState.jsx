import EmptyStateImg from "../../assets/image/todo-empty-state.svg";

const EmptyTodoState = ({ setShowModalAdd }) => {
  return (
    <div
      className="empty-item container"
      data-cy="todo-empty-state"
      onClick={() => setShowModalAdd(true)}
    >
      <img className="empty-state" src={EmptyStateImg} alt="empty state todo" />
    </div>
  );
};

export default EmptyTodoState;

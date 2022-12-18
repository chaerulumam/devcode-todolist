import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useActivities } from "../../context/activities-context";
import ActivityDetailBar from "../activity/ActivityDetailBar";
import ListItem from "../list-item/ListItem";
import DeleteModal from "../modal/DeleteModal";
import SuccessModal from "../modal/SuccessModal";
import TodoModal from "../modal/TodoModal";
import EmptyTodoState from "./EmptyTodoState";

const TodoDetail = () => {
  const { id } = useParams();
  const {
    activities,
    getActivities,
    updateActivity,
    addTodoItem,
    deleteTodoItem,
  } = useActivities();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listIndex, setListIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [todoItem, setTodoItem] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (id) getActivities(id);

    return () => {
      getActivities(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (activities.todo_items) setTodoItem(activities.todo_items);
  }, [activities]);

  const handleCloseAddModal = () => {
    setShowModalAdd(false);
    setIsEdit(false);
    setListIndex(null);
  };

  const handleOpenAddModal = (idx = null) => {
    setShowModalAdd(true);
    setListIndex(idx);
  };

  const handleCloseDeleteModal = () => {
    setShowModalDelete(false);
  };

  const handleOpenDeleteModal = (idx) => {
    setListIndex(idx);
    setShowModalDelete(true);
  };

  const handleDeleteTodoItem = (todoId) => {
    deleteTodoItem(todoId, id);
    handleCloseDeleteModal();
  };

  return (
    <>
      <SuccessModal setShowAlert={setShowAlert} show={showAlert} />
      <ActivityDetailBar
        name={activities?.title}
        id={id}
        updateActivity={updateActivity}
        onOpenModal={handleOpenAddModal}
        item={todoItem}
        setTodoItem={setTodoItem}
      />

      <div className="todo-item">
        {todoItem.length > 0 ? (
          todoItem.map((item, idx) => {
            return (
              <ListItem
                key={item.id}
                item={item}
                onOpenModal={() => handleOpenDeleteModal(idx)}
                onEditModal={() => handleOpenAddModal(idx)}
                setIsEdit={setIsEdit}
                groupId={id}
              />
            );
          })
        ) : (
          <EmptyTodoState setShowModalAdd={setShowModalAdd} />
        )}
      </div>

      <TodoModal
        onCloseModal={handleCloseAddModal}
        id={id}
        addTodoItem={addTodoItem}
        edit={isEdit}
        item={todoItem[listIndex]}
        show={showModalAdd}
      />

      <DeleteModal
        onCloseModal={handleCloseDeleteModal}
        item={todoItem[listIndex]}
        onDeleteItem={handleDeleteTodoItem}
        todo
        show={showModalDelete}
      />
    </>
  );
};

export default TodoDetail;

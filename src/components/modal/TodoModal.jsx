import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import Backdrop from "../button/Backdrop";
import Dropdown from "../button/Dropdown";
import "./modal.css";
import { useActivities } from "../../context/activities-context";

const TodoModal = ({ onCloseModal, id, addTodoItem, edit, item, show }) => {
  const [selected, setSelected] = useState("Very High");
  const [title, setTitle] = useState("");
  const { updateTodoStatus } = useActivities();

  useEffect(() => {
    if (edit) {
      setTitle(item.title);
      setSelected(item.priority === "normal" ? "Medium" : item.priority);
    }
  }, []);

  const handleAddTodoItem = () => {
    let priority = selected.split(" ").join("-").toLowerCase();
    priority = priority === "medium" ? "normal" : priority;
    addTodoItem(id, title, priority);
    setTitle("");
    setSelected("Very High");
    onCloseModal();
  };

  const handleUpdateTodoItem = () => {
    updateTodoStatus(item.id, id, {
      title,
      priority:
        selected === "Medium"
          ? "normal"
          : selected.split(" ").join("-").toLowerCase(),
    });
    onCloseModal();
  };

  // TODO
  // update title function
  // dropdown value
  return (
    <>
      <div className={`modal ${!show && "hide"}`} data-cy="modal-add">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" data-cy="modal-add-title">
              {edit ? "Edit Item" : "Tambah List Item"}
            </h4>
            <span
              className="close-icon"
              onClick={onCloseModal}
              data-cy="modal-add-close-button"
            ></span>
          </div>
          <div className="modal-body">
            <div className="field-container">
              <label
                htmlFor="nama"
                data-cy="modal-add-name-title"
                className="input-label"
              >
                Nama List Item
              </label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Tambahkan nama Activity"
                  id="AddFormTitle"
                  className="input"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                  data-cy="modal-add-name-input"
                />
              </div>
            </div>

            <div className="field-container">
              <label
                htmlFor="nama"
                data-cy="modal-add-priority-title"
                className="input-label"
              >
                Priority
              </label>
              <div className="input-container">
                <Dropdown
                  selected={selected}
                  setSelected={setSelected}
                  data-cy="modal-add-name-input"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              disabled={!title}
              data-cy="modal-add-save-button"
              onClick={edit ? handleUpdateTodoItem : handleAddTodoItem}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {show && <Backdrop onClick={onCloseModal} />}
    </>
  );
};

export default TodoModal;

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import SortButton from "../button/SortButton";

const ActivityDetailBar = ({
  name,
  id,
  updateActivity,
  onOpenModal,
  item,
  setTodoItem,
}) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [title, setTitle] = useState("");
  // const [sortIsActive, setSortIsActive] = useState(false);

  const inputRef = useRef();
  const titleRef = useRef();
  const editRef = useRef();
  const handleShowInput = (e) => {
    if (
      e.target === inputRef.current ||
      e.target === titleRef.current ||
      e.target === editRef.current
    ) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const onFocus = () => setIsFocus(true);
  const onBlur = () => {
    setIsFocus(false);
    updateActivity(id, title);
  };

  useEffect(() => {
    setTitle(name);
  }, [name]);

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  useEffect(() => {
    if (!isFocus) setShowInput(false);
  }, [isFocus]);

  return (
    <div className="container todo-wrapper" onClick={(e) => handleShowInput(e)}>
      <div className="todo-title">
        <span
          data-cy="todo-back-button"
          className="back-icon"
          onClick={() => navigate("/")}
        ></span>
        {showInput ? (
          <input
            type="text"
            className="todo-input"
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onBlur()}
            data-cy="todo-title"
          />
        ) : (
          <h1 data-cy="todo-title" ref={titleRef}>
            {name}
          </h1>
        )}
        <span
          className="edit-icon"
          ref={editRef}
          data-cy="todo-title-edit-button"
        ></span>
      </div>
      <div className="btn-group">
        <SortButton groupId={id} item={item} setTodoItem={setTodoItem} />
        <Button
          variant="add"
          data-cy="todo-add-button"
          color="primary"
          onClick={onOpenModal}
        >
          Tambah
        </Button>
      </div>
    </div>
  );
};

export default ActivityDetailBar;

import React from "react";

const AddButton = (props) => {
  return (
    <button {...props} className={`btn btn-${props.color}`}>
      {props.variant === "add" && (
        <>
          <span className="icon-plus"></span>
        </>
      )}
      {props.children}
    </button>
  );
};

export default AddButton;

import React, { useState } from "react";

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["Very High", "High", "Medium", "Low", "Very Low"];
  const labelPriority = (priority) => {
    return priority.split(" ").join("-").toLowerCase();
  };
  const handleDropdown = (option) => {
    setSelected(option);
    setIsActive(false);
  };
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        data-cy="modal-add-priority-dropdown"
        onClick={(e) => setIsActive((prev) => !prev)}
      >
        <div className="item-label">
          <span className={`priority-icon ${labelPriority(selected)}`}></span>
          <span className="priority-item-title">
            {selected.split("-").join(" ")}
          </span>
          <span className="chevron-down-icon"></span>
        </div>
      </div>

      <div className={`dropdown-content ${!isActive && "hide"}`}>
        {options.map((option) => (
          <div
            key={option}
            className="dropdown-item"
            onClick={() => handleDropdown(option)}
            data-cy="modal-add-priority-item"
          >
            <span className={`priority-icon ${labelPriority(option)}`}></span>
            <span className="priority-item-title">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

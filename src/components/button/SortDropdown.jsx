import React from "react";

const options = [
  { title: "terbaru", value: "latest" },
  { title: "terlama", value: "oldest" },
  { title: "A-Z", value: "az" },
  { title: "Z-A", value: "za" },
  { title: "belum selesai", value: "unfinished" },
];

const SortDropdown = ({ selected, setSelected, isActive, setIsActive }) => {

  const handleDropdown = (option) => {
    setSelected(option);
    setIsActive(false);
  };
  return (
    <div className={`dropdown sort-dropdown `}>
      <div className={`dropdown-content ${!isActive && "hide"}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className="dropdown-item"
            data-cy="sort-selection"
            onClick={() => handleDropdown(option.value)}
          >
            <div
              className="item-label"
              data-cy={`${
                selected === option.value ? "sort-selection-selected" : "false"
              }`}
            >
              <span
                className={`sort-option sort-${option.value}`}
                data-cy="sort-selection-icon"
              ></span>
              <span
                className="priority-item-title"
                data-cy="sort-selection-title"
              >
                {option.title}
              </span>
              {selected === option.value && (
                <span className="check-icon"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;

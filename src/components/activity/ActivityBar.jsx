import React from "react";
import { useActivities } from "../../context/activities-context";
import Button from "../button/Button";

const ActivityBar = () => {
  const { addActivity } = useActivities();
  return (
    <div className="container todo-header">
      <h1 data-cy="activity-title">Activity</h1>
      <Button variant="add" color="primary" onClick={addActivity} data-cy="activity-add-button">
        Tambah
      </Button>
    </div>
  );
};

export default ActivityBar;

import { useContext, createContext, useState } from "react";
import {
  sortByAlphabet,
  sortByAlphabetReverse,
  sortByLatest,
  sortByOldest,
  sortByUnfinished,
} from "../helpers/sort";

const ActivitiesContext = createContext();
const BASE_API = "https://todo.api.devcode.gethired.id";
const EMAIL = "chaerulumamb244@gmail.com";

export function useActivities() {
  return useContext(ActivitiesContext);
}

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  const getActivities = (id = false) => {
    let url = BASE_API + "/activity-groups?email=" + EMAIL;
    if (id) {
      url = "https://todo.api.devcode.gethired.id/activity-groups/" + id;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const data = id ? res : res.data;
        setActivities(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addActivity = () => {
    const payload = {
      title: "New Activity",
      email: EMAIL,
    };
    fetch(BASE_API + "/activity-groups", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => getActivities())
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addTodoItem = (id, title, priority) => {
    const payload = {
      title,
      priority,
      activity_group_id: id,
    };
    fetch(BASE_API + "/todo-items", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => getActivities(id))
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateActivity = (id, title) => {
    fetch(BASE_API + "/activity-groups/" + id, {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => getActivities(id))
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateTodoStatus = (id, groupId, obj) => {
    fetch(BASE_API + "/todo-items/" + id, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        getActivities(groupId);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteActivity = (id) => {
    fetch(BASE_API + "/activity-groups/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getActivities();
      });
  };

  const deleteTodoItem = (id, groupId) => {
    fetch(BASE_API + "/todo-items/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getActivities(groupId);
      });
  };

  const sortTodo = (status, array) => {
    switch (status) {
      case "latest":
        return sortByLatest(array);
      case "oldest":
        return sortByOldest(array);
      case "az":
        return sortByAlphabet(array);
      case "za":
        return sortByAlphabetReverse(array);
      case "unfinished":
        return sortByUnfinished(array);
      default:
        return sortByLatest(array);
    }
  };
  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        getActivities,
        addActivity,
        deleteActivity,
        updateActivity,
        addTodoItem,
        deleteTodoItem,
        updateTodoStatus,
        sortTodo,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

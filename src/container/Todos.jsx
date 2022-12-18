import Header from "../components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Activity from "../components/activity/Activity";
import TodoDetail from "../components/todo/TodoDetail";

const Todos = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="/detail/:id" element={<TodoDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Todos;

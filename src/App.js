import Todos from "./container/Todos";
import { ActivitiesProvider } from "./context/activities-context";
import "./styles/App.css";

function App() {
  return (
    <ActivitiesProvider>
      <Todos />
    </ActivitiesProvider>
  );
}

export default App;

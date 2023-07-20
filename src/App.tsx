import { useEffect } from "react";
import "./App.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import { useAppDispatch } from "./hooks/hooks";
import { getTodos } from "./redux/operations";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <NewTodoForm />
      <TodoList />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import "./App.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
// import { todoAdded } from "./redux/slices/todoSlice";
import { useAppDispatch } from "./hooks/hooks";
import { fetchTodos, addNewTodo } from "./redux/slices/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos);
  }, [dispatch]);

  return (
    <div className="App">
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      <TodoList />
    </div>
  );
}

export default App;

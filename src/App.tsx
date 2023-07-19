import React, { useState, useEffect } from "react";

import "./App.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <h1>This is my app</h1>
      <NewTodoForm />
      <TodoList />
    </div>
  );
}

export default App;

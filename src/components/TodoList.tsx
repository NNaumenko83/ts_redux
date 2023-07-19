import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectTasks } from "../redux/slices/todoSlice";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todos = useAppSelector(selectTasks);
  console.log("todos:", todos);

  return (
    <div>
      TodoList
      <ul>
        {todos.list.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

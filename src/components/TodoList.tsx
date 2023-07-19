import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.list);
  console.log("todos:", todos);
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

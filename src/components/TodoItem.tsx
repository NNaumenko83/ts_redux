import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { removeTodo, toggleComplete } from "../redux/slices/todoSlice";

interface ITodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
  id,
  title,
  completed,
}) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(removeTodo(id))}>x</span>
    </li>
  );
};

import React from "react";
import { Todo } from "../types/types";
import { useAppDispatch } from "../hooks/hooks";
import { addTask, toggleStatus, deleteTask } from "../redux/slices/todoSlice";

export const TodoItem: React.FC<Todo> = ({ completed, title, id }) => {
  const dispatch = useAppDispatch();
  const onDeleteTodoButtonClick = () => {
    dispatch(deleteTask(id));
  };

  const toggleCompleteHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = (): void => {
    dispatch(toggleStatus(id));
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleCompleteHandler}
      />
      {title}
      <button onClick={onDeleteTodoButtonClick}>x</button>
    </div>
  );
};

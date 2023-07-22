import React from "react";
import { Todo } from "../types/types";
import { useAppDispatch } from "../hooks/hooks";
// import { removeTask } from "../redux/todoSlice";
import { toggleStatus, removeTodo } from "../redux/operations";

export const TodoItem = ({ completed, id, title }: Todo) => {
  const dispatch = useAppDispatch();

  const onDeleteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <button type="button" onClick={onDeleteButtonClick}>
        x
      </button>
    </div>
  );
};

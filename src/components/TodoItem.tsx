import React from "react";
import { Todo } from "../types/types";
import { useAppDispatch } from "../hooks/hooks";
import { removeTask, toggleCompleted } from "../redux/todoSlice";

export const TodoItem = ({ completed, id, title }: Todo) => {
  const dispatch = useAppDispatch();

  const onDeleteButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(removeTask(id));
  };

  const toggleStatusHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = () => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleStatusHandler}
      />
      <span>{title}</span>
      <button type="button" onClick={onDeleteButtonClick}>
        x
      </button>
    </div>
  );
};

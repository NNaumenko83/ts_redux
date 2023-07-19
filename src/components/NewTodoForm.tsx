import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { addTask } from "../redux/slices/todoSlice";

export const NewTodoForm: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const onAddTaskButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    dispatch(addTask(value));
    setValue("");
  };

  return (
    <div>
      NewTodoForm
      <input type="text" value={value} onChange={onChangeHandler} />
      <button onClick={onAddTaskButtonClick}>Add todo</button>
    </div>
  );
};

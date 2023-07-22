import React, { useState } from "react";

import { useAppDispatch } from "../hooks/hooks";
import { addNewTodo } from "../redux/operations";

export const NewTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const onAddTodoHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addNewTodo(value));
    setValue("");
  };

  return (
    <div>
      NewTodoForm
      <input type="text" onChange={onChangeHandler} value={value} />
      <button type="button" onClick={onAddTodoHandler}>
        Add task
      </button>
    </div>
  );
};

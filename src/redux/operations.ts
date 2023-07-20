import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../types/types";

export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/getTodos", async (_, { rejectWithValue }) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10"
  );

  if (!response.ok) {
    return rejectWithValue("Server error!");
  }

  const data = response.json();
  return data;
});

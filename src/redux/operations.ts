import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../types/types";
import { TodoState } from "./todoSlice";

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

export const toggleStatus = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string; state: { todos: TodoState } }
>("todos/toggleStatus", async (id, { rejectWithValue, getState }) => {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: !todo.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Server error");
    }

    return (await response.json()) as Todo;
  }

  return rejectWithValue("No such todo in the list!");
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addTodo", async (text, { rejectWithValue }) => {
  const todo: { title: string; completed: boolean } = {
    title: text,
    completed: false,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    return rejectWithValue("Server error");
  }

  return response.json();
});

export const removeTodo = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("todos/removeTodo", async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return rejectWithValue("Server error");
  }

  return id;
});

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Todo } from "../../types/types";
// Define a type for the slice state

type TodoState = {
  list: Todo[];
};

// Define the initial state using that type
const initialState: TodoState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: new Date().toString(),
        title: action.payload,
        completed: false,
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) toggledTodo.completed = !toggledTodo.completed;
    },
  },
});

export const { addTask, deleteTask, toggleStatus } = todosSlice.actions;

export const selectTasks = (state: RootState) => state.todos;

export default todosSlice.reducer;

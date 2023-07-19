import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/types";

// Define a type for the slice state
export interface TodoState {
  list: Todo[];
}

// Define the initial state using that type
const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
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

    removeTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },

    toggleCompleted: (state, action: PayloadAction<string>) => {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
  },
});

export const { addTask, removeTask, toggleCompleted } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default todoSlice.reducer;

import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/types";
import { getTodos, toggleStatus, addNewTodo, removeTodo } from "./operations";

// Define a type for the slice state
export interface TodoState {
  list: Todo[];
  isLoading: boolean;
  error: string;
}

// Define the initial state using that type
const initialState: TodoState = {
  list: [],
  isLoading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todos",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // addTask: (state, action: PayloadAction<string>) => {
    //   state.list.push({
    //     id: new Date().toString(),
    //     title: action.payload,
    //     completed: false,
    //   });
    // },
    // removeTask: (state, action: PayloadAction<string>) => {
    //   state.list = state.list.filter((todo) => todo.id !== action.payload);
    // },
    // toggleCompleted: (state, action: PayloadAction<string>) => {
    //   const toggledTodo = state.list.find((todo) => todo.id === action.payload);
    //   if (toggledTodo) {
    //     toggledTodo.completed = !toggledTodo.completed;
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.list.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        // console.log("state:", state.list);
        console.log("action:", action.payload);

        state.list = state.list.filter((todo) => {
          console.log("todo.id:", todo.id !== action.payload);
          return todo.id !== action.payload;
        });
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// export const { addTask, removeTask, toggleCompleted } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` types
export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

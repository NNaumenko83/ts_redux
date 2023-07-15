import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TodosState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toString(),
        title: action.payload,
        completed: false,
      });
    },

    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },

    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { todoAdded, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

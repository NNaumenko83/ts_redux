import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
  loading: boolean;
  error: null | string;
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );

  if (!response.ok) {
    return rejectWithValue("Server error");
  }

  const data = await response.json();
  return data;
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async (text, { rejectWithValue }) => {
  const todo = {
    title: text,
    iserId: 1,
    completed: false,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task.Server error");
  }

  return (await response.json()) as Todo;
});

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/toggleStatus", async (id, { rejectWithValue, dispatch, getState }) => {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      }
    );

    if (!response.ok) {
      return rejectWithValue("Can't toggle status. Server error");
    }

    return (await response.json()) as Todo;
  }

  return rejectWithValue("No such todo in the list!");
});

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state, action) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.pending, (state, action) => {
        state.error = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
      });
  },
  reducers: {
    //   todoAdded(state, action: PayloadAction<string>) {
    //     state.list.push({
    //       id: new Date().toString(),
    //       title: action.payload,
    //       completed: false,
    //     });
    //   },
    //   toggleComplete(state, action: PayloadAction<string>) {
    //     const toggledTodo = state.list.find((todo) => todo.id === action.payload);
    //     if (toggledTodo) {
    //       toggledTodo.completed = !toggledTodo.completed;
    //     }
    //   },
    //   removeTodo(state, action: PayloadAction<string>) {
    //     state.list = state.list.filter((todo) => todo.id !== action.payload);
    //   },
  },
});

// export const { todoAdded, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

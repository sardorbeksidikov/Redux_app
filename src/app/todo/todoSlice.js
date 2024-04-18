import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todos: [],
  error: "",
  searchedTodos: [],
  filteredTodos: [],
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  try {
    const res = await axios.get("http://localhost:3000/students");
    const data = await res.data;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  try {
    const res = await axios.post("http://localhost:3000/students", todo);
    const data = await res.data;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/students/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (todo) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/students/${todo.id}`,
      todo
    );
    const data = await res.data;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    searchTodos: (state, action) => {
      state.searchedTodos = state.todos.filter((todo) =>
        todo.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterTodos: (state, action) => {
      state.filteredTodos = state.todos.filter((todo) => todo.completed);
    },
  },
  extraReducers: (builder) => {
    // FETCH TODOS
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    });
    // ADD TODO
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
      state.error = "";
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // DELETE TODO
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.error = "";
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // UPDATE TODO
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.error = "";
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const {searchTodos, filterTodos} = todoSlice.actions;

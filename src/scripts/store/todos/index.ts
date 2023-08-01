import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from 'models/Todo';
import { Todos } from 'models/Todos';
import {
  createTodo,
  deleteTodos,
  editTodo,
  fetchTodos,
} from 'store/todos/actions';

const initialState: Todos = {
  filter: {
    sort: 'CREATED_DESC',
    page: 0,
    folder: null,
    query: '',
  },
  items: [],
  count: 0,
  loading: false,
  error: null,
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.count = payload.count;
      state.filter = payload.filter;
    });

    // general fetch start
    builder.addMatcher(
      isAnyOf(
        fetchTodos.pending,
        createTodo.pending,
        editTodo.pending,
        deleteTodos.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      },
    );

    // general fetch error
    builder.addMatcher(
      isAnyOf(
        fetchTodos.rejected,
        createTodo.rejected,
        editTodo.rejected,
        deleteTodos.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      },
    );

    // general fetch success
    builder.addMatcher(
      isAnyOf(
        fetchTodos.fulfilled,
        createTodo.fulfilled,
        editTodo.fulfilled,
        deleteTodos.fulfilled,
      ),
      (state) => {
        state.loading = false;
      },
    );
  },
});

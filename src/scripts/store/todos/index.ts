import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from 'models/Todo';
import { Todos } from 'models/Todos';
import {
  createTodo,
  deleteTodos,
  editTodo,
  fetchTodos,
  filterTodos,
} from 'store/todos/actions';

const initialState: Todos = {
  filter: {
    page: 0,
    perPage: 25,
    sort: 'CREATED_DESC',
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
    });

    builder.addCase(filterTodos.fulfilled, (state, { payload }) => {
      const { filter } = state;
      const { folder, query } = payload;
      filter.folder = 'undefined' !== typeof folder ? folder : filter.folder;
      filter.query = 'undefined' !== typeof query ? query : filter.query;
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
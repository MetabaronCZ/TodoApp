import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodoList } from 'models/TodoList';
import { Todo } from 'models/Todo';

const initialState: TodoList = {
  loading: false,
  error: null,
  items: [],
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
  },
});

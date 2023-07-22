import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodoFolder } from 'models/TodoFolder';
import { TodoFolders } from 'models/TodoFolders';

const initialState: TodoFolders = {
  loading: false,
  error: null,
  items: [],
};

export const todoFoldersSlice = createSlice({
  name: 'todoFolders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<TodoFolder[]>) => {
      state.items = action.payload;
    },
  },
});

import { configureStore } from '@reduxjs/toolkit';

import { TodoList } from 'models/TodoList';
import { Settings } from 'models/Settings';
import { TodoFolders } from 'models/TodoFolders';

import { todoListSlice } from 'store/list';
import { settingsSlice } from 'store/settings';
import { todoFoldersSlice } from 'store/folders';

interface AppState {
  readonly todo: TodoList;
  readonly folder: TodoFolders;
  readonly settings: Settings;
}

export const store = configureStore<AppState>({
  reducer: {
    todo: todoListSlice.reducer,
    folder: todoFoldersSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

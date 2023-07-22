import { configureStore } from '@reduxjs/toolkit';

import { Todos } from 'models/Todos';
import { Settings } from 'models/Settings';
import { Folders } from 'models/Folders';

import { todoListSlice } from 'store/todos';
import { settingsSlice } from 'store/settings';
import { todoFoldersSlice } from 'store/folders';

export interface AppState {
  readonly todo: Todos;
  readonly folder: Folders;
  readonly settings: Settings;
}

export const store = configureStore<AppState>({
  reducer: {
    todo: todoListSlice.reducer,
    folder: todoFoldersSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

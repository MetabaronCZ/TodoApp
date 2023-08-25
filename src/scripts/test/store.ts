import { AnyAction, ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import { AppState } from 'store';
import { todoListSlice } from 'store/todos';
import { settingsSlice } from 'store/settings';
import { todoFoldersSlice } from 'store/folders';

export const mockStore = (): ToolkitStore<
  AppState,
  AnyAction,
  [ThunkMiddleware<AppState, AnyAction>]
> => {
  return configureStore<AppState>({
    reducer: {
      todo: todoListSlice.reducer,
      folder: todoFoldersSlice.reducer,
      settings: settingsSlice.reducer,
    },
  });
};

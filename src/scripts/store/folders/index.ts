import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Folder } from 'models/Folder';
import { Folders } from 'models/Folders';
import {
  createFolder,
  deleteFolders,
  editFolder,
  fetchFolders,
} from 'store/folders/actions';

const initialState: Folders = {
  loading: false,
  error: null,
  items: [],
};

export const todoFoldersSlice = createSlice({
  name: 'todoFolders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, { payload }) => {
      state.items = payload;
    });

    builder.addCase(createFolder.fulfilled, (state, { payload }) => {
      state.items.push(payload);
    });

    builder.addCase(editFolder.fulfilled, (state, { payload }) => {
      state.items = state.items.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload.data };
        }
        return item;
      });
    });

    builder.addCase(deleteFolders.fulfilled, (state, { payload }) => {
      state.items = state.items.filter((item) => !payload.includes(item.id));
    });

    // general fetch start
    builder.addMatcher(
      isAnyOf(
        fetchFolders.pending,
        createFolder.pending,
        editFolder.pending,
        deleteFolders.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      },
    );

    // general fetch error
    builder.addMatcher(
      isAnyOf(
        fetchFolders.rejected,
        createFolder.rejected,
        editFolder.rejected,
        deleteFolders.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      },
    );

    // general fetch success
    builder.addMatcher(
      isAnyOf(
        fetchFolders.fulfilled,
        createFolder.fulfilled,
        editFolder.fulfilled,
        deleteFolders.fulfilled,
      ),
      (state) => {
        state.loading = false;
      },
    );
  },
});

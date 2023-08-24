import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { Settings, SettingsData } from 'models/Settings';
import { fetchSettings, updateSettings } from 'store/settings/actions';

const initialState: Settings = {
  loading: false,
  error: null,
  data: {
    perPage: 20,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<SettingsData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, { payload }) => {
      state.data = payload;
    });

    builder.addCase(updateSettings.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });

    // general fetch start
    builder.addMatcher(
      isAnyOf(fetchSettings.pending, updateSettings.pending),
      (state) => {
        state.loading = true;
        state.error = null;
      },
    );

    // general fetch error
    builder.addMatcher(
      isAnyOf(fetchSettings.rejected, updateSettings.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      },
    );

    // general fetch success
    builder.addMatcher(
      isAnyOf(fetchSettings.fulfilled, updateSettings.fulfilled),
      (state) => {
        state.loading = false;
      },
    );
  },
});

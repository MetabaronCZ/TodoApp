import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from 'models/Settings';

const initialState: Settings = {
  perPage: 25,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

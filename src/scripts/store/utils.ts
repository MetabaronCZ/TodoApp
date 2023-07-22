import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppState, store } from 'store';

type AppDispatch = (typeof store)['dispatch'];

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector = <T>(fn: (state: AppState) => T): T =>
  useSelector<AppState, T>(fn);

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  readonly state: AppState;
  readonly dispatch: AppDispatch;
  readonly rejectValue: Error;
}>();

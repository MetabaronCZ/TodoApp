import { describe, expect, it, vi } from 'vitest';

import { client } from 'client';
import { SettingsData } from 'models/Settings';

import { settingsSlice } from 'store/settings';
import { fetchSettings, updateSettings } from 'store/settings/actions';

import { mockStore } from 'test/store';

const { setSettings } = settingsSlice.actions;

describe('store/settings', () => {
  describe('setSettings()', () => {
    it('should populate settings data', async () => {
      const testData: SettingsData = { perPage: 50 };

      const store = mockStore();
      let state = store.getState();
      expect(testData).not.toEqual(state.settings.data);

      store.dispatch(setSettings(testData));
      state = store.getState();
      expect(state.settings.error).toEqual(null);
      expect(state.settings.loading).toEqual(false);
      expect(state.settings.data).toEqual(testData);
    });
  });

  describe('fetchSettings()', () => {
    it('should fetch settings data from API', async () => {
      const testData: SettingsData = { perPage: 50 };

      const api = vi.spyOn(client.settings, 'get');
      api.mockImplementation(() => Promise.resolve(testData));
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(testData).not.toEqual(state.settings.data);

      const result = await store.dispatch(fetchSettings());
      expect(api).toBeCalledTimes(1);
      expect(result.payload).toEqual(testData);

      state = store.getState();
      expect(state.settings.error).toEqual(null);
      expect(state.settings.loading).toEqual(false);
      expect(state.settings.data).toEqual(testData);
    });

    it('should set store error on API error', async () => {
      const errorMessage = 'Mocked error!';
      const api = vi.spyOn(client.settings, 'get');
      api.mockRejectedValue(errorMessage);

      const store = mockStore();
      let state = store.getState();
      expect(state.settings.error).toEqual(null);

      await store.dispatch(fetchSettings());
      state = store.getState();
      expect(state.settings.error).toEqual(errorMessage);
      expect(state.settings.loading).toEqual(false);
    });
  });

  describe('updateSettings()', () => {
    it('should update settings server data', async () => {
      const testData: SettingsData = { perPage: 50 };

      const api = vi.spyOn(client.settings, 'set');
      api.mockImplementation(() => Promise.resolve());
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(testData).not.toEqual(state.settings.data);

      const result = await store.dispatch(updateSettings(testData));
      expect(api).toBeCalledTimes(1);
      expect(result.payload).toEqual(testData);

      state = store.getState();
      expect(state.settings.error).toEqual(null);
      expect(state.settings.loading).toEqual(false);
      expect(state.settings.data).toEqual(testData);
    });

    it('should keep settings state when no data sent', async () => {
      const api = vi.spyOn(client.settings, 'set');
      api.mockImplementation(() => Promise.resolve());
      expect(api).not.toBeCalled();

      const store = mockStore();
      const initialState = store.getState().settings.data;

      const result = await store.dispatch(updateSettings({}));
      expect(api).toBeCalledTimes(1);
      expect(result.payload).toEqual({});

      const state = store.getState();
      expect(state.settings.error).toEqual(null);
      expect(state.settings.loading).toEqual(false);
      expect(state.settings.data).toEqual(initialState);
    });

    it('should set store error on API error', async () => {
      const errorMessage = 'Mocked error!';
      const api = vi.spyOn(client.settings, 'set');
      api.mockImplementation(() => Promise.reject(errorMessage));

      const store = mockStore();
      let state = store.getState();
      expect(state.settings.error).toEqual(null);

      await store.dispatch(fetchSettings());
      state = store.getState();
      expect(state.settings.error).toEqual(errorMessage);
      expect(state.settings.loading).toEqual(false);
    });
  });
});

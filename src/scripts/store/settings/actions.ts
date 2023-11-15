import { client } from 'client';
import { SettingsData } from 'models/Settings';

import { createAppAsyncThunk } from 'store/utils';

export const fetchSettings = createAppAsyncThunk<SettingsData, void>(
  'settings/fetch',
  async () => await client.settings.get(),
);

export const updateSettings = createAppAsyncThunk<
  Partial<SettingsData>,
  Partial<SettingsData>
>('settings/update', async (data) => {
  await client.settings.set(data);
  return data;
});

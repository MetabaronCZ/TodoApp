import axios from 'axios';
import { ObjectSchema, mixed, object } from 'yup';

import { Client } from 'models/Client';
import { handleClientRequest } from 'client/utils';
import { SettingsData, TodoPerPage, perPages } from 'models/Settings';

interface FetchSettingsResult {
  readonly data: SettingsData;
}

const settingsDataSchema: ObjectSchema<SettingsData> = object({
  perPage: mixed<TodoPerPage>().oneOf(perPages).defined(),
});

const fetchSettingsSchema: ObjectSchema<FetchSettingsResult> = object({
  data: settingsDataSchema.defined(),
});

export const settingsClient: Client['settings'] = {
  get: () => {
    return handleClientRequest(async () => {
      const response = await axios.get<FetchSettingsResult>('/api/settings');
      const validated = await fetchSettingsSchema.validate(response.data);
      return validated.data;
    });
  },
  set: (data) => {
    return handleClientRequest(async () => {
      await axios.post('/api/settings', data);
    });
  },
};

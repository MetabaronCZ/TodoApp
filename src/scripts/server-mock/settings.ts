import { SettingsData } from 'models/Settings';

import { mockedDb } from 'server-mock/db';
import { mockApiRequest } from 'server-mock/utils';

export const apiSettings = {
  get: (): Promise<SettingsData> => {
    return mockApiRequest(() => ({
      ...mockedDb.settings,
    }));
  },
  set: (data: Partial<SettingsData>): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.settings = {
        ...mockedDb.settings,
        ...data,
      };
    });
  },
};

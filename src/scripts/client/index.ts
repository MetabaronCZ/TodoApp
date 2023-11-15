import { Client } from 'models/Client';

import { todoClient } from 'client/todo';
import { folderClient } from 'client/folder';
import { settingsClient } from 'client/settings';

export const client: Client = {
  todo: todoClient,
  folder: folderClient,
  settings: settingsClient,
};

import { Client } from 'models/Client';
import { api } from 'server-mock/api';

export const client: Client = {
  todo: {
    get: api.todos.get,
    create: api.todos.create,
    edit: api.todos.edit,
    move: (id, folder) => api.todos.edit(id, { folder }),
    delete: api.todos.delete,
  },
  folder: {
    get: api.folders.get,
    create: api.folders.create,
    edit: api.folders.edit,
    delete: api.folders.delete,
  },
  settings: {
    get: api.settings.get,
    set: api.settings.set,
  },
};

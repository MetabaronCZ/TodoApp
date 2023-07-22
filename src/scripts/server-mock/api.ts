import { apiTodos } from 'server-mock/todos';
import { apiFolders } from 'server-mock/folders';
import { apiSettings } from 'server-mock/settings';

export const api = {
  todos: apiTodos,
  folders: apiFolders,
  settings: apiSettings,
};

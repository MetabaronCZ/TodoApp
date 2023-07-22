import { Todo, TodoData } from 'models/Todo';
import { SettingsData } from 'models/Settings';
import { Folder, FolderData } from 'models/Folder';
import { TodoFilter, FetchTodosResponse } from 'models/Todos';

export interface Client {
  readonly todo: {
    readonly get: (config?: TodoFilter) => Promise<FetchTodosResponse>;
    readonly create: (data: TodoData) => Promise<Todo>;
    readonly edit: (id: string, data: Partial<TodoData>) => Promise<void>;
    readonly move: (id: string, folder: string) => Promise<void>;
    readonly delete: (ids: string[]) => Promise<void>;
  };
  readonly folder: {
    readonly get: () => Promise<Folder[]>;
    readonly create: (data: FolderData) => Promise<Folder>;
    readonly edit: (id: string, data: Partial<FolderData>) => Promise<void>;
    readonly delete: (ids: string[]) => Promise<void>;
  };
  readonly settings: {
    readonly get: () => Promise<SettingsData>;
    readonly set: (data: Partial<SettingsData>) => Promise<void>;
  };
}

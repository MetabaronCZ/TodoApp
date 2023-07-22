import { Settings } from 'models/Settings';
import { Todo, TodoData } from 'models/Todo';
import { FetchTodoFoldersResponse } from 'models/TodoFolders';
import { TodoFolder, TodoFolderData } from 'models/TodoFolder';
import { FetchTodoListConfig, FetchTodoListResponse } from 'models/TodoList';

export interface Client {
  readonly todo: {
    readonly get: (
      config: FetchTodoListConfig,
    ) => Promise<FetchTodoListResponse>;
    readonly create: (data: TodoData) => Promise<Todo>;
    readonly edit: (id: string, data: Partial<TodoData>) => Promise<void>;
    readonly move: (id: string, folder: string) => Promise<void>;
    readonly delete: (ids: string[]) => Promise<void>;
  };
  readonly folder: {
    readonly get: () => Promise<FetchTodoFoldersResponse>;
    readonly create: (data: TodoFolderData) => Promise<TodoFolder>;
    readonly edit: (id: string, data: Partial<TodoFolderData>) => Promise<void>;
    readonly delete: (ids: string[], withItems?: boolean) => Promise<void>;
  };
  readonly settings: {
    readonly get: () => Promise<Settings>;
    readonly set: (data: Partial<Settings>) => Promise<void>;
  };
}

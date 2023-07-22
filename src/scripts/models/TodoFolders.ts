import { TodoFolder } from 'models/TodoFolder';

export interface TodoFolders {
  readonly items: TodoFolder[];
  readonly loading: boolean;
  readonly error: string | null;
}

export interface FetchTodoFoldersResponse {
  readonly items: TodoFolder[];
}

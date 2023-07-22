import { Todo } from 'models/Todo';
import { TodoPerPage } from 'models/Settings';

export interface TodoList {
  readonly items: Todo[];
  readonly loading: boolean;
  readonly error: string | null;
}

export interface FetchTodoListResponse {
  readonly items: Todo[];
  readonly count: number;
}

export const todoListSort = [
  'TITLE_ASC',
  'TITLE_DESC',
  'DONE_0',
  'DONE_1',
  'CREATED_ASC',
  'CREATED_DESC',
] as const;

export type TodoSort = (typeof todoListSort)[number];

export interface FetchTodoListConfig {
  readonly page: number;
  readonly perPage: TodoPerPage;
  readonly sort: TodoSort;
  readonly filter: {
    readonly query: string;
    readonly folder: string | null;
  };
}

import { Todo } from 'models/Todo';

export interface Todos {
  readonly filter: TodoFilter;
  readonly items: Todo[];
  readonly count: number;
  readonly loading: boolean;
  readonly error: string | null;
}

export interface FetchTodosResponse {
  readonly items: Todo[];
  readonly count: number;
}

export const todoSort = [
  'TITLE_ASC',
  'TITLE_DESC',
  'DONE_0',
  'DONE_1',
  'CREATED_ASC',
  'CREATED_DESC',
] as const;

export type TodoSort = (typeof todoSort)[number];

export interface TodoFilter {
  readonly sort: TodoSort;
  readonly page: number;
  readonly query: string;
  readonly folder: string | null;
}

export interface FetchTodoFilter extends TodoFilter {
  readonly perPage: number;
}

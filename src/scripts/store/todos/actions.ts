import { client } from 'modules/client';
import { Todo, TodoData } from 'models/Todo';
import {
  FetchTodosResponse,
  TodoSort,
  FetchTodoFilter,
  TodoFilter,
} from 'models/Todos';

import { createAppAsyncThunk } from 'store/utils';
import { fetchFolders } from 'store/folders/actions';

interface EditTodoPayload {
  readonly id: string;
  readonly data: Partial<TodoData>;
}

interface FilterTodosPalyoad {
  readonly query?: string;
  readonly folder?: string | null;
}

export interface FetchTodosResult extends FetchTodosResponse {
  readonly filter: TodoFilter;
}

export const fetchTodos = createAppAsyncThunk<
  FetchTodosResult,
  Partial<FetchTodoFilter> | undefined
>('todos/fetch', async (config = {}, { getState }) => {
  const { todo, settings } = getState();

  const filter: TodoFilter = {
    folder:
      'undefined' !== typeof config.folder ? config.folder : todo.filter.folder,
    query: config.query ?? todo.filter.query,
    sort: config.sort ?? todo.filter.sort,
    page: config.page ?? todo.filter.page,
  };
  const result = await client.todo.get({
    ...filter,
    perPage: config.perPage ?? settings.data.perPage,
  });

  return { ...result, filter };
});

export const fetchTodoDetail = createAppAsyncThunk<Todo | null, string>(
  'todos/fetchDetail',
  async (id) => {
    return await client.todo.getDetail(id);
  },
);

export const filterTodos = createAppAsyncThunk<void, FilterTodosPalyoad>(
  'todos/filter',
  async (data, { dispatch, getState }) => {
    const { filter } = getState().todo;
    const folder =
      'undefined' !== typeof data.folder ? data.folder : filter.folder;
    const query = 'undefined' !== typeof data.query ? data.query : filter.query;
    await dispatch(fetchTodos({ folder, query, page: 0 }));
  },
);

export const sortTodos = createAppAsyncThunk<void, TodoSort>(
  'todos/sort',
  async (sort, { dispatch }) => {
    await dispatch(fetchTodos({ sort, page: 0 }));
  },
);

export const createTodo = createAppAsyncThunk<void, TodoData>(
  'todos/create',
  async (data, { dispatch }) => {
    await client.todo.create(data);
    await dispatch(fetchTodos({ page: 0 }));
  },
);

export const editTodo = createAppAsyncThunk<void, EditTodoPayload>(
  'todos/edit',
  async (payload, { dispatch }) => {
    const { id, data } = payload;
    await client.todo.edit(id, data);
    await Promise.all([
      dispatch(fetchTodos({ page: 0 })),
      dispatch(fetchFolders()),
    ]);
  },
);

export const deleteTodos = createAppAsyncThunk<void, string[]>(
  'todos/delete',
  async (ids, { dispatch }) => {
    await client.todo.delete(ids);
    await Promise.all([
      dispatch(fetchTodos({ page: 0 })),
      dispatch(fetchFolders()),
    ]);
  },
);

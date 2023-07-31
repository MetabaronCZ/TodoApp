import { Todo, TodoData } from 'models/Todo';
import { client } from 'modules/client';
import { TodoFilter, FetchTodosResponse, TodoSort } from 'models/Todos';

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

export const fetchTodos = createAppAsyncThunk<
  FetchTodosResponse,
  Partial<TodoFilter> | void
>('todos/fetch', async (config, { getState }) => {
  const { filter } = getState().todo;
  const fetchConfig: TodoFilter = { ...filter, ...config };
  return await client.todo.get(fetchConfig);
});

export const fetchTodoDetail = createAppAsyncThunk<Todo | null, string>(
  'todos/fetchDetail',
  async (id) => {
    return await client.todo.getDetail(id);
  },
);

export const filterTodos = createAppAsyncThunk<
  FilterTodosPalyoad,
  FilterTodosPalyoad
>('todos/filter', async (data, { dispatch }) => {
  await dispatch(fetchTodos(data));
  return data;
});

export const sortTodos = createAppAsyncThunk<void, TodoSort>(
  'todos/sort',
  async (sort, { dispatch }) => {
    await dispatch(fetchTodos({ sort }));
  },
);

export const createTodo = createAppAsyncThunk<void, TodoData>(
  'todos/create',
  async (data, { dispatch }) => {
    await client.todo.create(data);
    await dispatch(fetchTodos());
  },
);

export const editTodo = createAppAsyncThunk<void, EditTodoPayload>(
  'todos/edit',
  async (payload, { dispatch }) => {
    const { id, data } = payload;
    await client.todo.edit(id, data);
    await dispatch(fetchFolders());
  },
);

export const deleteTodos = createAppAsyncThunk<void, string[]>(
  'todos/delete',
  async (ids, { dispatch }) => {
    await client.todo.delete(ids);
    await Promise.all([dispatch(fetchTodos()), dispatch(fetchFolders())]);
  },
);

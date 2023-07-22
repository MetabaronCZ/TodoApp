import { TodoData } from 'models/Todo';
import { client } from 'modules/client';
import { TodoFilter, FetchTodosResponse } from 'models/Todos';

import { createAppAsyncThunk } from 'store/utils';
import { fetchFolders } from 'store/folders/actions';

interface EditTodoPayload {
  readonly id: string;
  readonly data: Partial<TodoData>;
}

export const fetchTodos = createAppAsyncThunk<
  FetchTodosResponse,
  TodoFilter | undefined
>('todos/fetch', async (config, { getState }) => {
  const { filter } = getState().todo;
  const fetchConfig: TodoFilter = { ...filter, ...config };
  return await client.todo.get(fetchConfig);
});

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
    await dispatch(fetchTodos());
  },
);

export const deleteTodos = createAppAsyncThunk<void, string[]>(
  'todos/delete',
  async (ids, { dispatch }) => {
    await client.todo.delete(ids);
    await Promise.all([dispatch(fetchTodos()), dispatch(fetchFolders())]);
  },
);

import { ObjectSchema, array, boolean, number, object, string } from 'yup';

import { Todo } from 'models/Todo';
import { Client } from 'models/Client';

interface FetchTodosResult {
  readonly data: {
    readonly items: Todo[];
    readonly count: number;
  };
}
interface FetchTodoDetailResult {
  readonly data: Todo | null;
}

interface CreateTodoResult {
  readonly data: Todo;
}

const todoSchema: ObjectSchema<Todo> = object({
  id: string().defined(),
  title: string().defined(),
  description: string().defined(),
  created: number().defined(),
  folder: string().nullable().defined(),
  isDone: boolean().defined(),
});

const todoFetchSchema: ObjectSchema<FetchTodosResult> = object({
  data: object({
    items: array().of(todoSchema).defined(),
    count: number().defined(),
  }),
});

const todoDetailSchema: ObjectSchema<FetchTodoDetailResult> = object({
  data: todoSchema.nullable().defined(),
});

const todoCreateSchema: ObjectSchema<CreateTodoResult> = object({
  data: todoSchema.defined(),
});

export const todoClient: Client['todo'] = {
  get: async (data) => {
    const query = data
      ? new URLSearchParams({
          ...data,
          folder: data.folder || '',
          page: `${data.page || ''}`,
          perPage: `${data.perPage || ''}`,
        })
      : '';

    const response = await window
      .fetch(`/api/todo?${query.toString()}`)
      .then((result) => result.json());

    const validated = await todoFetchSchema.validate(response);
    return validated.data;
  },
  getDetail: async (id) => {
    const response = await window
      .fetch(`/api/todo?id=${id}`)
      .then((result) => result.json());

    const validated = await todoDetailSchema.validate(response);
    return validated.data;
  },
  create: async (data) => {
    const response = await window
      .fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((result) => result.json());

    const validated = await todoCreateSchema.validate(response);
    return validated.data;
  },
  edit: async (data) => {
    await window.fetch('/api/todo', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  delete: async (ids) => {
    await window.fetch('/api/todo', {
      method: 'DELETE',
      body: ids.join('|'),
    });
  },
};

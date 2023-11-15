import axios from 'axios';
import { ObjectSchema, array, boolean, number, object, string } from 'yup';

import { Todo } from 'models/Todo';
import { Client } from 'models/Client';
import { handleClientRequest } from 'client/utils';

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
  get: (data) => {
    return handleClientRequest(async () => {
      const response = await axios.get<FetchTodosResult>('/api/todo', {
        params: data,
      });
      const validated = await todoFetchSchema.validate(response.data);
      return validated.data;
    });
  },
  getDetail: (id) => {
    return handleClientRequest(async () => {
      const response = await axios.get<FetchTodoDetailResult>(
        `/api/todo/${id}`,
      );
      const validated = await todoDetailSchema.validate(response.data);
      return validated.data;
    });
  },
  create: (data) => {
    return handleClientRequest(async () => {
      const response = await axios.post<CreateTodoResult>('/api/todo', data);
      const validated = await todoCreateSchema.validate(response.data);
      return validated.data;
    });
  },
  edit: (data) => {
    return handleClientRequest(async () => {
      await axios.patch('/api/todo', data);
    });
  },
  delete: (ids) => {
    return handleClientRequest(async () => {
      await axios.delete(`/api/todo?ids=${ids.join('|')}`);
    });
  },
};

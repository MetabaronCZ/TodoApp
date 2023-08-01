import { Todo, TodoData } from 'models/Todo';
import { FetchTodoFilter, FetchTodosResponse } from 'models/Todos';

import { mockedDb } from 'server-mock/db';
import { mockApiRequest, mockCreatedId } from 'server-mock/utils';

const defaultConfig: FetchTodoFilter = {
  page: 0,
  perPage: 20,
  folder: null,
  query: '',
  sort: 'CREATED_DESC',
};

export const apiTodos = {
  get: (
    config: FetchTodoFilter = defaultConfig,
  ): Promise<FetchTodosResponse> => {
    const { page, perPage, query, folder, sort } = config;

    return mockApiRequest(() => {
      // filter items
      const items = mockedDb.todos.filter((item) => {
        // filter by folder
        if (folder && folder !== item.folder) {
          return false;
        }
        // filter by query string
        if (
          query &&
          !item.title.includes(query) &&
          !item.description.includes(query)
        ) {
          return false;
        }
        return true;
      });

      // sort items
      items.sort((a, b) => {
        switch (sort) {
          case 'TITLE_ASC':
            return a.title.localeCompare(b.title);
          case 'TITLE_DESC':
            return b.title.localeCompare(a.title);
          case 'CREATED_ASC':
            return a.created - b.created;
          case 'CREATED_DESC':
            return b.created - a.created;
          case 'DONE_1':
            return a.isDone === b.isDone ? 0 : a.isDone ? -1 : +1;
          case 'DONE_0':
            return a.isDone === b.isDone ? 0 : a.isDone ? +1 : -1;
          default:
            return 0;
        }
      });

      const start = page * perPage;
      const end = start + perPage;

      return {
        items: items.slice(start, end),
        count: items.length,
      };
    });
  },
  getDetail: (id: string): Promise<Todo | null> => {
    return mockApiRequest(() => {
      return mockedDb.todos.find((item) => id === item.id) || null;
    });
  },
  create: (data: TodoData): Promise<Todo> => {
    return mockApiRequest(() => {
      const todo: Todo = {
        ...data,
        id: mockCreatedId('TODO'),
        created: Date.now(),
      };
      mockedDb.todos = [...mockedDb.todos, todo];
      return todo;
    });
  },
  edit: (id: string, data: Partial<TodoData>): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.todos = mockedDb.todos.map((item) => {
        if (id === item.id) {
          return { ...item, ...data };
        }
        return item;
      });
    });
  },
  delete: (ids: string[]): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.todos = mockedDb.todos.filter((item) => {
        return !ids.includes(item.id);
      });
    });
  },
};

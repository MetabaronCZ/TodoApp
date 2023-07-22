import { Todo, TodoData } from 'models/Todo';
import { FetchTodosResponse } from 'models/Todos';

import { mockedDb } from 'server-mock/db';
import { mockApiRequest, mockCreatedId } from 'server-mock/utils';

export const apiTodos = {
  get: (): Promise<FetchTodosResponse> => {
    return mockApiRequest(() => ({
      items: { ...mockedDb.todos },
      count: mockedDb.todos.length,
    }));
  },
  create: (data: TodoData): Promise<Todo> => {
    return mockApiRequest(() => ({
      ...data,
      id: mockCreatedId('TODO'),
      created: Date.now(),
    }));
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
  move: (id: string, folderId: string): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.folders = mockedDb.folders.map((folder) => {
        if (folderId === folder.id && !folder.items.includes(id)) {
          return {
            ...folder,
            items: [...folder.items, id],
          };
        }
        return folder;
      });
    });
  },
  delete: (ids: string[]): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.todos = mockedDb.todos.filter((item) => {
        return !ids.includes(item.id);
      });

      mockedDb.folders = mockedDb.folders.map((folder) => ({
        ...folder,
        items: folder.items.filter((item) => !ids.includes(item)),
      }));
    });
  },
};

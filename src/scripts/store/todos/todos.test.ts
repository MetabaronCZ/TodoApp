import { describe, expect, it, vi } from 'vitest';

import { client } from 'client';
import { Todo, TodoData } from 'models/Todo';
import { FetchTodosResponse } from 'models/Todos';

import { todoListSlice } from 'store/todos';
import {
  FetchTodosResult,
  FilterTodosPalyoad,
  createTodo,
  deleteTodos,
  editTodo,
  fetchTodoDetail,
  fetchTodos,
  filterTodos,
  sortTodos,
} from 'store/todos/actions';

import { mockStore } from 'test/store';

const { setTodos } = todoListSlice.actions;
const errorMessage = 'Mocked error!';

const todos: Todo[] = [
  {
    id: '0',
    title: 'Todo A',
    description: '',
    created: 0,
    folder: null,
    isDone: false,
  },
  {
    id: '1',
    title: 'Todo B',
    description: '',
    created: 1,
    folder: '0',
    isDone: true,
  },
];

describe('store/todos', () => {
  describe('setTodos()', () => {
    it('should set todo data', async () => {
      const testData = [...todos];

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);

      store.dispatch(setTodos(testData));
      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(testData);
    });

    it('should clear todos', async () => {
      const testData = [...todos];

      const store = mockStore();
      store.dispatch(setTodos(testData));

      let state = store.getState();
      expect(testData).toEqual(state.todo.items);

      store.dispatch(setTodos([]));
      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual([]);
    });
  });

  describe('fetchTodos()', () => {
    it('should fetch todos from API', async () => {
      const testData = [...todos];
      const fetchResponse: FetchTodosResponse = {
        items: testData,
        count: testData.length,
      };
      const fetchResult: FetchTodosResult = {
        ...fetchResponse,
        filter: {
          folder: null,
          page: 0,
          query: '',
          sort: 'CREATED_DESC',
        },
      };
      const api = vi.spyOn(client.todo, 'get');
      api.mockImplementation(() => Promise.resolve(fetchResponse));
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(fetchTodos());
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(fetchResult);

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(fetchResponse.items);
      expect(state.todo.count).toEqual(fetchResponse.count);
    });

    it('should set store error on API error', async () => {
      const api = vi.spyOn(client.todo, 'get');
      api.mockImplementation(() => Promise.reject(errorMessage));

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.error).toEqual(null);

      await store.dispatch(fetchTodos());
      state = store.getState();
      expect(state.todo.error).toEqual(errorMessage);
      expect(state.todo.loading).toEqual(false);
    });
  });

  describe('fetchTodoDetail()', () => {
    it('should fetch todo detail data from API', async () => {
      const testData: Todo = { ...todos[0] };
      const api = vi.spyOn(client.todo, 'getDetail');
      api.mockImplementation(() => Promise.resolve(testData));
      expect(api).not.toBeCalled();

      const store = mockStore();
      const response = await store.dispatch(fetchTodoDetail('ANY'));
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(testData);
    });

    it('should return error on invalid todo ID', async () => {
      const api = vi.spyOn(client.todo, 'getDetail');
      api.mockImplementation(() => Promise.reject(errorMessage));

      const store = mockStore();
      const response = await store.dispatch(fetchTodoDetail('INVALID'));
      expect(api).toBeCalledTimes(1);
      expect(response.meta.requestStatus).toEqual('rejected');
    });
  });

  describe('filterTodos()', () => {
    it('should call fetch todo API', async () => {
      const testData = [...todos];
      const fetchResponse: FetchTodosResponse = {
        items: testData,
        count: testData.length,
      };
      const filter: FilterTodosPalyoad = {
        folder: '10',
        query: 'q10',
      };
      const api = vi.spyOn(client.todo, 'get');
      api.mockImplementation(() => Promise.resolve(fetchResponse));
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(filterTodos(filter));
      expect(api).toBeCalledTimes(1);
      expect(api).lastCalledWith(
        expect.objectContaining({
          query: filter.query,
          folder: filter.folder,
        }),
      );
      expect(response.payload).toBeUndefined();

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(fetchResponse.items);
      expect(state.todo.count).toEqual(fetchResponse.count);
    });
  });

  describe('sortTodos()', () => {
    it('should call fetch todo API', async () => {
      const testData = [...todos];
      const fetchResponse: FetchTodosResponse = {
        items: testData,
        count: testData.length,
      };
      const api = vi.spyOn(client.todo, 'get');
      api.mockImplementation(() => Promise.resolve(fetchResponse));
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(sortTodos('DONE_1'));
      expect(api).toBeCalledTimes(1);
      expect(api).lastCalledWith(expect.objectContaining({ sort: 'DONE_1' }));

      expect(response.payload).toBeUndefined();

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(fetchResponse.items);
      expect(state.todo.count).toEqual(fetchResponse.count);
    });
  });

  describe('createTodo()', () => {
    it('should create a todo', async () => {
      const data = [...todos];

      const testData: TodoData = {
        title: 'New todo',
        description: '',
        folder: '10',
        isDone: true,
      };
      const responseData: Todo = {
        ...testData,
        id: 'NEW',
        created: Date.now(),
      };
      const refetchData: FetchTodosResponse = {
        items: [...data, responseData],
        count: data.length + 1,
      };

      const apiFetch = vi.spyOn(client.todo, 'get');
      const apiCreate = vi.spyOn(client.todo, 'create');

      apiFetch.mockImplementation(() => Promise.resolve(refetchData));
      apiCreate.mockImplementation(() => Promise.resolve(responseData));
      expect(apiFetch).not.toBeCalled();
      expect(apiCreate).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(createTodo(testData));
      expect(apiCreate).toBeCalledTimes(1);
      expect(apiFetch).toBeCalledTimes(1); // todos refetched
      expect(response.payload).toEqual(responseData);

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(refetchData.items);
      expect(state.todo.count).toEqual(refetchData.count);
    });
  });

  describe('editTodo()', () => {
    it('should edit existing todo item', async () => {
      const data = [...todos];

      const testData: TodoData = {
        title: 'Edited todo',
        description: '',
        folder: null,
        isDone: false,
      };
      const payload = { id: data[1].id, data: testData };
      const result: Todo[] = [data[0], { ...data[1], ...testData }];

      const refetchResponse = {
        items: result,
        count: result.length,
      };

      const apiEdit = vi.spyOn(client.todo, 'edit');
      const apiFetch = vi.spyOn(client.todo, 'get');
      const apiFetchFolders = vi.spyOn(client.folder, 'get');

      apiEdit.mockImplementation(() => Promise.resolve());
      apiFetch.mockImplementation(() => Promise.resolve(refetchResponse));
      apiFetchFolders.mockImplementation(() => Promise.resolve([]));

      expect(apiEdit).not.toBeCalled();
      expect(apiFetch).not.toBeCalled();
      expect(apiFetchFolders).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setTodos(data));

      let state = store.getState();
      expect(state.todo.items).toEqual(data);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(editTodo(payload));
      expect(apiEdit).toBeCalledTimes(1);
      expect(apiFetch).toBeCalledTimes(1);
      expect(apiFetchFolders).toBeCalledTimes(1);
      expect(response.payload).toEqual(payload);

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(refetchResponse.items);
      expect(state.todo.count).toEqual(refetchResponse.count);
    });

    it('should throw when ID invalid', async () => {
      const data = [...todos];

      const testData: TodoData = {
        title: 'Non-existent todo',
        description: '',
        folder: null,
        isDone: false,
      };
      const apiEdit = vi.spyOn(client.todo, 'edit');
      const apiFetch = vi.spyOn(client.todo, 'get');
      const apiFetchFolders = vi.spyOn(client.folder, 'get');

      apiEdit.mockImplementation(() => Promise.reject(errorMessage));
      apiFetch.mockImplementation(() =>
        Promise.resolve({ items: [], count: 0 }),
      );
      apiFetchFolders.mockImplementation(() => Promise.resolve([]));

      expect(apiEdit).not.toBeCalled();
      expect(apiFetch).not.toBeCalled();
      expect(apiFetchFolders).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setTodos(data));

      let state = store.getState();
      expect(state.todo.items).toEqual(data);
      expect(state.todo.count).toEqual(0);

      await store.dispatch(editTodo({ id: '-1', data: testData }));
      expect(apiEdit).toBeCalledTimes(1);
      expect(apiFetch).not.toBeCalled(); // no todo refetch
      expect(apiFetchFolders).not.toBeCalled(); // no folders refetch

      state = store.getState();
      expect(state.todo.error).toEqual(errorMessage);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(data);
      expect(state.todo.count).toEqual(0);
    });
  });

  describe('deleteTodos()', () => {
    it('should delete existing todo', async () => {
      const data = [...todos];

      const refetchResponse = {
        items: data,
        count: data.length,
      };

      const apiFetch = vi.spyOn(client.todo, 'get');
      const apiDelete = vi.spyOn(client.todo, 'delete');
      const apiFetchFolders = vi.spyOn(client.folder, 'get');

      apiFetch.mockImplementation(() => Promise.resolve(refetchResponse));
      apiDelete.mockImplementation(() => Promise.resolve());
      apiFetchFolders.mockImplementation(() => Promise.resolve([]));

      expect(apiFetch).not.toBeCalled();
      expect(apiDelete).not.toBeCalled();
      expect(apiFetchFolders).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);
      expect(state.todo.count).toEqual(0);

      const response = await store.dispatch(deleteTodos(['0']));
      expect(apiDelete).toBeCalledTimes(1); // todo deleted
      expect(apiFetch).toBeCalledTimes(1); // todos refetched
      expect(apiFetchFolders).toBeCalledTimes(1); // folders refetched
      expect(response.payload).toEqual(['0']);

      state = store.getState();
      expect(state.todo.error).toEqual(null);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual(refetchResponse.items);
      expect(state.todo.count).toEqual(refetchResponse.count);
    });

    it('should throw when ID invalid', async () => {
      const refetchesponse = [...todos];
      const apiFetch = vi.spyOn(client.todo, 'get');
      const apiDelete = vi.spyOn(client.todo, 'delete');
      const apiFetchFolders = vi.spyOn(client.folder, 'get');

      apiFetch.mockImplementation(() =>
        Promise.resolve({
          items: refetchesponse,
          count: refetchesponse.length,
        }),
      );
      apiDelete.mockImplementation(() => Promise.reject(errorMessage));
      apiFetchFolders.mockImplementation(() => Promise.resolve([]));

      expect(apiFetch).not.toBeCalled();
      expect(apiDelete).not.toBeCalled();
      expect(apiFetchFolders).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.todo.items).toEqual([]);

      await store.dispatch(deleteTodos(['-1']));
      expect(apiDelete).toBeCalledTimes(1);
      expect(apiFetch).not.toBeCalled(); // no todo refetch
      expect(apiFetchFolders).not.toBeCalled(); // no folder refetch

      state = store.getState();
      expect(state.todo.error).toEqual(errorMessage);
      expect(state.todo.loading).toEqual(false);
      expect(state.todo.items).toEqual([]);
    });
  });
});

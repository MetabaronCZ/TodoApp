import { describe, expect, it, vi } from 'vitest';

import { client } from 'client';
import { Folder, FolderData } from 'models/Folder';

import { todoFoldersSlice } from 'store/folders';
import {
  createFolder,
  deleteFolders,
  editFolder,
  fetchFolders,
} from 'store/folders/actions';

import { mockStore } from 'test/store';

const { setFolders } = todoFoldersSlice.actions;
const errorMessage = 'Mocked error!';

describe('store/folders', () => {
  describe('setFolders()', () => {
    it('should set folders data', async () => {
      const testData: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];

      const store = mockStore();
      let state = store.getState();
      expect(state.folder.items).toEqual([]);

      store.dispatch(setFolders(testData));
      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual(testData);
    });

    it('should clear folders data', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(data).toEqual(state.folder.items);

      store.dispatch(setFolders([]));
      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual([]);
    });
  });

  describe('fetchFolders()', () => {
    it('should fetch folders from API', async () => {
      const testData: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];

      const api = vi.spyOn(client.folder, 'get');
      api.mockImplementation(() => Promise.resolve(testData));
      expect(api).not.toBeCalled();

      const store = mockStore();
      let state = store.getState();
      expect(state.folder.items).toEqual([]);

      const response = await store.dispatch(fetchFolders());
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(testData);

      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual(testData);
    });

    it('should set store error on API error', async () => {
      const api = vi.spyOn(client.folder, 'get');
      api.mockRejectedValue(errorMessage);

      const store = mockStore();
      let state = store.getState();
      expect(state.folder.error).toEqual(null);

      await store.dispatch(fetchFolders());
      state = store.getState();
      expect(state.folder.error).toEqual(errorMessage);
      expect(state.folder.loading).toEqual(false);
    });
  });

  describe('createFolder()', () => {
    it('should create an folder', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const testData: FolderData = {
        title: 'New folder',
      };
      const responseData: Folder = {
        ...testData,
        id: 'NEW',
      };

      const api = vi.spyOn(client.folder, 'create');
      api.mockImplementation(() => Promise.resolve(responseData));
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);

      const response = await store.dispatch(createFolder(testData));
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(responseData);

      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual([...data, responseData]);
    });
  });

  describe('editFolder()', () => {
    it('should edit existing folder data', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const testData: FolderData = {
        title: 'Edited folder',
      };
      const payload = { id: data[1].id, data: testData };
      const result: Folder[] = [data[0], { ...data[1], ...testData }];

      const api = vi.spyOn(client.folder, 'edit');
      api.mockImplementation(() => Promise.resolve());
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);
      expect(state.folder.items).not.toEqual(result);

      const response = await store.dispatch(editFolder(payload));
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(payload);

      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual(result);
    });

    it('should throw when ID invalid', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const api = vi.spyOn(client.folder, 'edit');
      api.mockImplementation(() => Promise.reject(errorMessage));
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);

      await store.dispatch(
        editFolder({ id: '-1', data: { title: 'Non-existent folder' } }),
      );
      expect(api).toBeCalledTimes(1);

      state = store.getState();
      expect(state.folder.error).toEqual(errorMessage);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual(data);
    });
  });

  describe('deleteFolders()', () => {
    it('should delete existing folder', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const api = vi.spyOn(client.folder, 'delete');
      api.mockImplementation(() => Promise.resolve());
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);

      const response = await store.dispatch(deleteFolders(['0']));
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(['0']);

      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual([data[1]]);
    });

    it('should delete multiple folders', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const api = vi.spyOn(client.folder, 'delete');
      api.mockImplementation(() => Promise.resolve());
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);

      const response = await store.dispatch(deleteFolders(['0', '1']));
      expect(api).toBeCalledTimes(1);
      expect(response.payload).toEqual(['0', '1']);

      state = store.getState();
      expect(state.folder.error).toEqual(null);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual([]);
    });

    it('should throw when ID invalid', async () => {
      const data: Folder[] = [
        { id: '0', title: 'Folder A' },
        { id: '1', title: 'Folder B' },
      ];
      const api = vi.spyOn(client.folder, 'delete');
      api.mockImplementation(() => Promise.reject(errorMessage));
      expect(api).not.toBeCalled();

      const store = mockStore();
      store.dispatch(setFolders(data));

      let state = store.getState();
      expect(state.folder.items).toEqual(data);

      await store.dispatch(deleteFolders(['-1']));
      expect(api).toBeCalledTimes(1);

      state = store.getState();
      expect(state.folder.error).toEqual(errorMessage);
      expect(state.folder.loading).toEqual(false);
      expect(state.folder.items).toEqual(data);
    });
  });
});

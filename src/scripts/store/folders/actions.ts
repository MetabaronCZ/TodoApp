import { client } from 'client';
import { Folder, FolderData } from 'models/Folder';

import { createAppAsyncThunk } from 'store/utils';

interface EditFolderPayload {
  readonly id: string;
  readonly data: Partial<FolderData>;
}

export const fetchFolders = createAppAsyncThunk<Folder[], void>(
  'folders/fetch',
  async () => await client.folder.get(),
);

export const createFolder = createAppAsyncThunk<Folder, FolderData>(
  'folders/create',
  async (data) => await client.folder.create(data),
);

export const editFolder = createAppAsyncThunk<
  EditFolderPayload,
  EditFolderPayload
>('folders/edit', async (payload) => {
  const { id, data } = payload;
  await client.folder.edit(id, data);
  return payload;
});

export const deleteFolders = createAppAsyncThunk<string[], string[]>(
  'folders/delete',
  async (ids) => {
    await client.folder.delete(ids);
    return ids;
  },
);

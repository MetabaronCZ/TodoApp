import axios from 'axios';
import { ObjectSchema, array, object, string } from 'yup';

import { Client } from 'models/Client';
import { Folder } from 'models/Folder';

interface FetchFoldersResult {
  readonly data: Folder[];
}

interface CreateFolderResult {
  readonly data: Folder;
}

const folderSchema: ObjectSchema<Folder> = object({
  id: string().defined(),
  title: string().defined(),
});

const folderFetchSchema: ObjectSchema<FetchFoldersResult> = object({
  data: array().of(folderSchema).defined(),
});

const folderCreateSchema: ObjectSchema<CreateFolderResult> = object({
  data: folderSchema,
});

export const folderClient: Client['folder'] = {
  get: async () => {
    const response = await axios.get<FetchFoldersResult>('/api/folder');
    const validated = await folderFetchSchema.validate(response.data);
    return validated.data;
  },
  create: async (data) => {
    const response = await axios.post<CreateFolderResult>('/api/folder', data);
    const validated = await folderCreateSchema.validate(response.data);
    return validated.data;
  },
  edit: async (data) => {
    await axios.patch('/api/folder', data);
  },
  delete: async (ids) => {
    await axios.delete(`/api/folder?ids=${ids.join('|')}`);
  },
};

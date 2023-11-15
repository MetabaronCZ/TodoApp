import axios from 'axios';
import { ObjectSchema, array, object, string } from 'yup';

import { Client } from 'models/Client';
import { Folder } from 'models/Folder';
import { handleClientRequest } from 'client/utils';

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
  get: () => {
    return handleClientRequest(async () => {
      const response = await axios.get<FetchFoldersResult>('/api/folder');
      const validated = await folderFetchSchema.validate(response.data);
      return validated.data;
    });
  },
  create: (data) => {
    return handleClientRequest(async () => {
      const response = await axios.post<CreateFolderResult>(
        '/api/folder',
        data,
      );
      const validated = await folderCreateSchema.validate(response.data);
      return validated.data;
    });
  },
  edit: (data) => {
    return handleClientRequest(async () => {
      await axios.patch('/api/folder', data);
    });
  },
  delete: (ids) => {
    return handleClientRequest(async () => {
      await axios.delete(`/api/folder?ids=${ids.join('|')}`);
    });
  },
};

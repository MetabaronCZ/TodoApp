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
    const response = await window
      .fetch('/api/folder')
      .then((result) => result.json());

    const validated = await folderFetchSchema.validate(response);
    return validated.data;
  },
  create: async (data) => {
    const response = await window
      .fetch('/api/folder', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then((result) => result.json());

    const validated = await folderCreateSchema.validate(response);
    return validated.data;
  },
  edit: async (data) => {
    await window.fetch('/api/folder', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  delete: async (ids) => {
    await window.fetch('/api/folder', {
      method: 'DELETE',
      body: ids.join('|'),
    });
  },
};

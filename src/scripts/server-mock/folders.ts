import { Folder, FolderData } from 'models/Folder';

import { mockedDb } from 'server-mock/db';
import { mockApiRequest, mockCreatedId } from 'server-mock/utils';

export const apiFolders = {
  get: (): Promise<Folder[]> => {
    return mockApiRequest(() => ({
      ...mockedDb.folders,
    }));
  },
  create: (data: FolderData): Promise<Folder> => {
    return mockApiRequest(() => ({
      ...data,
      id: mockCreatedId('FOLDER'),
      items: [],
    }));
  },
  edit: (id: string, data: Partial<FolderData>): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.folders = mockedDb.folders.map((item) => {
        if (id === item.id) {
          return { ...item, ...data };
        }
        return item;
      });
    });
  },
  delete: (ids: string[]): Promise<void> => {
    return mockApiRequest(() => {
      mockedDb.folders = mockedDb.folders.filter((item) => {
        return !ids.includes(item.id);
      });
    });
  },
};

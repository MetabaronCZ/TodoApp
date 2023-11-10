import { Application } from 'express';
import { InferType, object, string } from 'yup';

import { Folder } from 'models/Folder';

import { mockedDb } from '../db';
import { mockApiRequest, mockCreatedId, mockParseParamArray } from '../utils';

const createFolderDataSchema = object({
  title: string().required(),
}).required();

const editFolderDataSchema = object({
  title: string(),
}).required();

export const setApiFolderEndpoints = (app: Application): void => {
  // get folder list
  app.get('/folder', async (req, res) => {
    await mockApiRequest();
    res.json({ data: mockedDb.folders });
  });

  // create folder
  app.post('/folder', async (req, res) => {
    const data = req.body;
    await mockApiRequest();

    try {
      await createFolderDataSchema.validate(data);
      const folderData = data as InferType<typeof createFolderDataSchema>;

      const folder: Folder = {
        ...folderData,
        id: mockCreatedId('FOLDER'),
      };
      mockedDb.folders = [...mockedDb.folders, folder];
      res.json({ data: folder });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // edit folder
  app.patch('/folder/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await mockApiRequest();

    try {
      await editFolderDataSchema.validate(data);
      const folderData = data as InferType<typeof editFolderDataSchema>;

      mockedDb.folders = mockedDb.folders.map((item) => {
        return id === item.id ? { ...item, ...folderData } : item;
      });

      res.json(null);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // delete folders
  app.delete('/folder', async (req, res) => {
    const { ids } = req.query;
    await mockApiRequest();

    const idsParsed = mockParseParamArray(ids);

    const validIds = mockedDb.folders
      .filter((item) => idsParsed.includes(item.id))
      .map((item) => item.id);

    if (0 === validIds.length) {
      res.status(500).json({ error: 'Could not delete folders: Invalid ID!' });
    } else {
      mockedDb.folders = mockedDb.folders.filter((item) => {
        return !validIds.includes(item.id);
      });

      mockedDb.todos = mockedDb.todos.filter((item) => {
        if (item.folder && validIds.includes(item.folder)) {
          return { ...item, folder: null };
        }
        return item;
      });

      res.json(null);
    }
  });
};

import { Application } from 'express';
import { object, string } from 'yup';

import { Folder } from 'models/Folder';

import { mockedDb } from '../db';
import { mockApiRequest, mockCreatedId, mockParseParamArray } from '../utils';

const createFolderDataSchema = object({
  title: string().defined(),
});

const editFolderDataSchema = object({
  title: string(),
});

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
      const validated = await createFolderDataSchema.validate(data);

      const folder: Folder = {
        ...validated,
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
      const validated = await editFolderDataSchema.validate(data);

      mockedDb.folders = mockedDb.folders.map((item) => {
        return id === item.id ? { ...item, ...validated } : item;
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

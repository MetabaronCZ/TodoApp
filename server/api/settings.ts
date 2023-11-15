import { Application } from 'express';
import { mixed, object, ObjectSchema } from 'yup';

import { mockedDb } from '../db';
import { mockApiRequest } from '../utils';

const perPages = [20, 30, 50] as const;
type TodoPerPage = (typeof perPages)[number];

const settingsDataSchema: ObjectSchema<{ perPage?: TodoPerPage }> = object({
  perPage: mixed<TodoPerPage>().oneOf(perPages),
});

export const setApiSettingsEndpoints = (app: Application): void => {
  // get settings
  app.get('/settings', async (req, res) => {
    await mockApiRequest();
    res.json({ data: mockedDb.settings });
  });

  // update settings
  app.post('/settings', async (req, res) => {
    const data = req.body;
    await mockApiRequest();

    try {
      const validated = await settingsDataSchema.validate(data);
      mockedDb.settings = { ...mockedDb.settings, ...validated };
      res.json(null);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
};

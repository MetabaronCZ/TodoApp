import { Application } from 'express';
import { object, number } from 'yup';

import { mockedDb } from '../db';
import { mockApiRequest } from '../utils';

const settingsDataSchema = object({
  perPage: number(),
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
      await settingsDataSchema.validate(data);

      mockedDb.settings = {
        ...mockedDb.settings,
        ...data,
      };
      res.json(null);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
};

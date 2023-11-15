import { Application } from 'express';
import { number, object, ObjectSchema } from 'yup';

import { mockedDb } from '../db';
import { mockApiRequest } from '../utils';

const settingsDataSchema: ObjectSchema<{ perPage?: number }> = object({
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
      const parsed = JSON.parse(data);
      await settingsDataSchema.validate(parsed);

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

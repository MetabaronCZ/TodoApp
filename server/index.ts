/* eslint-disable no-console */
import express from 'express';

import { setApiTodoEndpoints } from './api/todos';
import { setApiFolderEndpoints } from './api/folders';
import { setApiSettingsEndpoints } from './api/settings';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

setApiTodoEndpoints(app);
setApiFolderEndpoints(app);
setApiSettingsEndpoints(app);

// handle default browser favicon request
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// handle invalid path requests
app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

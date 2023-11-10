import { Application } from 'express';
import { InferType, boolean, object, string } from 'yup';

import { Todo } from 'models/Todo';

import { mockedDb } from '../db';
import {
  mockApiRequest,
  mockCreatedId,
  mockParseParamArray,
  mockParseParam,
  mockParseInteger,
} from '../utils';

const createTodoDataSchema = object({
  title: string().required(),
  description: string().required(),
  folder: string().nullable().required(),
  isDone: boolean().required(),
}).required();

const editTodoDataSchema = object({
  title: string(),
  description: string(),
  folder: string().nullable(),
  isDone: boolean(),
}).required();

export const setApiTodoEndpoints = (app: Application): void => {
  // get todo list
  app.get('/todo', async (req, res) => {
    await mockApiRequest();

    // parse params
    const perPage = mockParseInteger(req.query.perPage) ?? 20;
    const page = mockParseInteger(req.query.page) ?? 0;
    const folder = mockParseParam(req.query.folder);
    const query = mockParseParam(req.query.query);
    const sort = mockParseParam(req.query.sort);

    // filter items
    const items = mockedDb.todos.filter((item) => {
      // filter by folder
      if (folder && folder !== item.folder) {
        return false;
      }
      // filter by query string
      if (
        query &&
        !item.title.toLowerCase().includes(query.toLowerCase()) &&
        !item.description.toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // sort items
    items.sort((a, b) => {
      switch (sort) {
        case 'TITLE_ASC':
          return a.title.localeCompare(b.title);
        case 'TITLE_DESC':
          return b.title.localeCompare(a.title);
        case 'CREATED_ASC':
          return a.created - b.created;
        case 'CREATED_DESC':
          return b.created - a.created;
        case 'DONE_1':
          return a.isDone === b.isDone ? 0 : a.isDone ? -1 : +1;
        case 'DONE_0':
          return a.isDone === b.isDone ? 0 : a.isDone ? +1 : -1;
        default:
          // use CREATED_DESC as default
          return b.created - a.created;
      }
    });

    const start = page * perPage;
    const end = start + perPage;

    res.json({
      data: {
        items: items.slice(start, end),
        count: items.length,
      },
    });
  });

  // get todo detail
  app.get('/todo/:id', async (req, res) => {
    const { id } = req.params;
    await mockApiRequest();

    const todo = mockedDb.todos.find((item) => id === item.id);
    res.json({ data: todo || null });
  });

  // create todo
  app.post('/todo', async (req, res) => {
    const data = req.body;
    await mockApiRequest();

    try {
      await createTodoDataSchema.validate(data);
      const todoData = data as InferType<typeof createTodoDataSchema>;

      const todo: Todo = {
        ...todoData,
        id: mockCreatedId('TODO'),
        created: Date.now(),
      };
      mockedDb.todos = [...mockedDb.todos, todo];
      res.json({ data: todo });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // edit todo
  app.patch('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await mockApiRequest();

    try {
      await editTodoDataSchema.validate(data);
      const todoData = data as InferType<typeof editTodoDataSchema>;

      mockedDb.todos = mockedDb.todos.map((item) => {
        return id === item.id ? { ...item, ...todoData } : item;
      });

      res.json(null);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // delete todos
  app.delete('/todo', async (req, res) => {
    const { ids } = req.query;
    await mockApiRequest();

    const idsParsed = mockParseParamArray(ids);

    const validIds = mockedDb.todos
      .filter((item) => idsParsed.includes(item.id))
      .map((item) => item.id);

    if (0 === validIds.length) {
      res.status(500).json({ error: 'Could not delete todos: Invalid ID!' });
    } else {
      mockedDb.todos = mockedDb.todos.filter((item) => {
        return !validIds.includes(item.id);
      });

      res.json(null);
    }
  });
};

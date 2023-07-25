import { Todo } from 'models/Todo';
import { Folder } from 'models/Folder';
import { SettingsData } from 'models/Settings';

interface DbMock {
  todos: Todo[];
  folders: Folder[];
  settings: SettingsData;
}

export const mockedDb: DbMock = {
  todos: [
    {
      id: '0',
      title: 'Test todo item',
      description: 'Test test test.',
      folder: null,
      isDone: false,
      created: Date.now(),
    },
    {
      id: '1',
      title: 'Test todo item 2',
      description: 'Test test test 2.',
      folder: '1',
      isDone: true,
      created: Date.now(),
    },
  ],
  folders: [
    { id: '0', title: 'Folder A' },
    { id: '1', title: 'Folder B' },
    { id: '2', title: 'Folder C' },
  ],
  settings: {
    perPage: 25,
  },
};

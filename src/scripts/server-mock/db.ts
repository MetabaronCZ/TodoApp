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
      isDone: false,
      created: Date.now(),
    },
  ],
  folders: [
    {
      id: '0',
      title: 'Test folder',
      items: [],
    },
  ],
  settings: {
    perPage: 25,
  },
};

import React from 'react';
import { t } from 'i18next';
import { Provider } from 'react-redux';

import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { act, render } from '@testing-library/react';
import {
  MockInstance,
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { TodoList } from 'components/todo-list/TodoList';
import * as TodoListItem from 'components/todo-list/TodoListItem';
import * as TodoListToolbar from 'components/todo-list/TodoListToolbar';

import { client } from 'client';
import { Todo } from 'models/Todo';
import { todoListSlice } from 'store/todos';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const { setTodos } = todoListSlice.actions;

const testData: Todo[] = [
  {
    id: 'A',
    title: 'Todo A',
    description: '',
    created: 0,
    folder: null,
    isDone: false,
  },
  {
    id: 'B',
    title: 'Todo B',
    description: '',
    created: 1,
    folder: '0',
    isDone: true,
  },
  {
    id: 'C',
    title: 'Todo B',
    description: '',
    created: 2,
    folder: null,
    isDone: false,
  },
];

const server = setupServer(
  http.get('/api/todo', () => {
    return HttpResponse.json({
      data: { items: [], count: 0 },
    });
  }),
  http.get('/api/folder', () => {
    return HttpResponse.json({
      data: [],
    });
  }),
  http.delete('/api/todo', () => {
    return HttpResponse.json();
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const getTodoList = (todos: Todo[]): JSX.Element => {
  const store = mockStore();
  store.dispatch(setTodos(todos));

  return withMockedProviders(
    <Provider store={store}>
      <TodoList />
    </Provider>,
  );
};

// get component props for last "n" mocked calls
const getItemsProps = <T extends object>(
  component: MockInstance<[props: T, context?: never], React.ReactNode>,
  lastCalls = 3,
): Array<T> => {
  const { calls } = component.mock;
  return calls.map((call) => call[0]).slice(-lastCalls);
};

describe('components/todo-list/TodoList', () => {
  it('should render correctly', () => {
    const listItem = vi.spyOn(TodoListItem, 'TodoListItem');
    expect(listItem).toBeCalledTimes(0);

    const tree = render(getTodoList(testData));
    expect(tree.container).toMatchSnapshot();

    const { calls } = listItem.mock;
    const ids = calls.map((call) => call[0].item.id);
    expect(ids.length % 3).toEqual(0); // check item count (with re-renders)
    expect(ids.at(-3)).toEqual('A');
    expect(ids.at(-2)).toEqual('B');
    expect(ids.at(-1)).toEqual('C');
  });

  it('should render empty list', () => {
    const listItem = vi.spyOn(TodoListItem, 'TodoListItem');
    const toolbar = vi.spyOn(TodoListToolbar, 'TodoListToolbar');
    expect(listItem).toBeCalledTimes(0);
    expect(toolbar).toBeCalledTimes(0);

    const tree = render(getTodoList([]));
    expect(tree.container).toMatchSnapshot();

    expect(listItem).toBeCalledTimes(0);
    expect(tree.getByText(t('todoList.empty'))).toBeInTheDocument();

    expect(toolbar).toHaveBeenCalled();
    expect(toolbar).lastCalledWith(
      expect.objectContaining({ disabled: true }),
      expect.anything(),
    );
  });

  it('should be selectable', async () => {
    const listItem = vi.spyOn(TodoListItem, 'TodoListItem');
    const toolbar = vi.spyOn(TodoListToolbar, 'TodoListToolbar');

    render(getTodoList(testData));

    let items = getItemsProps(listItem);
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    if (toolbar.mock.lastCall) {
      expect(toolbar.mock.lastCall[0].selected).toEqual(false);
    }
    toolbar.mockClear();

    const testSelectItem = async (
      index: 0 | 1 | 2,
      shouldSelect: boolean,
      expectation: [boolean, boolean, boolean],
      selectedAll: boolean,
    ): Promise<void> => {
      await act(() => items[index].onSelect(shouldSelect));

      items = getItemsProps(listItem);
      expect(items[0].selected).toEqual(expectation[0]);
      expect(items[1].selected).toEqual(expectation[1]);
      expect(items[2].selected).toEqual(expectation[2]);

      expect(toolbar).toHaveBeenCalled();

      if (toolbar.mock.lastCall) {
        // select-all checkbox in toolbar active
        expect(toolbar.mock.lastCall[0].selected).toEqual(selectedAll);
      }
      toolbar.mockClear();
    };

    await testSelectItem(1, true, [false, true, false], true); // select 2nd item
    await testSelectItem(0, true, [true, true, false], true); // select 1st item
    await testSelectItem(1, false, [true, false, false], true); // deselect 2nd item
  });

  it('should be able to un/select-all', async () => {
    const listItem = vi.spyOn(TodoListItem, 'TodoListItem');
    const toolbar = vi.spyOn(TodoListToolbar, 'TodoListToolbar');

    render(getTodoList(testData));

    let items = getItemsProps(listItem);
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    // trigger select all
    await act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSelect(true);
      }
    });

    items = getItemsProps(listItem);
    expect(items[0].selected).toEqual(true);
    expect(items[1].selected).toEqual(true);
    expect(items[2].selected).toEqual(true);

    // trigger deselect all
    await act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSelect(false);
      }
    });

    items = getItemsProps(listItem);
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);
  });

  it('should be sortable', async () => {
    const toolbar = vi.spyOn(TodoListToolbar, 'TodoListToolbar');

    const mockedSortTodos = vi.spyOn(client.todo, 'get');
    expect(mockedSortTodos).toBeCalledTimes(0);

    render(getTodoList(testData));
    expect(toolbar).toHaveBeenCalled();

    if (toolbar.mock.lastCall) {
      expect(toolbar.mock.lastCall[0].sort).toEqual('CREATED_DESC');
    }

    // trigger todo sort
    await act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSort('TITLE_DESC');
      }
    });

    expect(mockedSortTodos).toBeCalledTimes(1);

    if (mockedSortTodos.mock.lastCall) {
      expect(mockedSortTodos.mock.lastCall[0]?.sort).toEqual('TITLE_DESC');
    }
  });

  it('should be able to delete selected', async () => {
    const listItem = vi.spyOn(TodoListItem, 'TodoListItem');
    const toolbar = vi.spyOn(TodoListToolbar, 'TodoListToolbar');

    const mockedConfirm = vi.spyOn(window, 'confirm');
    mockedConfirm.mockImplementation(vi.fn(() => true));
    expect(mockedConfirm).toBeCalledTimes(0);

    const mockedDeleteTodos = vi.spyOn(client.todo, 'delete');
    expect(mockedDeleteTodos).toBeCalledTimes(0);

    render(getTodoList(testData));

    let items = getItemsProps(listItem);

    // select first two items
    await act(() => {
      items[0].onSelect(true);
      items[1].onSelect(true);
    });

    items = getItemsProps(listItem);
    expect(items[0].selected).toEqual(true);
    expect(items[1].selected).toEqual(true);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    // trigger toolbar onDelete
    await act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onDelete();
      }
    });

    expect(mockedConfirm).toBeCalledTimes(1);
    expect(mockedDeleteTodos).toBeCalledTimes(1);
    expect(mockedDeleteTodos).toBeCalledWith(['A', 'B']);
  });
});

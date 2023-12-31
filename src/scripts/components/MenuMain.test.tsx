import React from 'react';
import { Provider } from 'react-redux';

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { render } from '@testing-library/react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import * as Menu from 'components/common/Menu';
import { MenuMain } from 'components/MenuMain';

import { Folder } from 'models/Folder';
import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

import { todoFoldersSlice } from 'store/folders';
import { filterTodos } from 'store/todos/actions';

const { setFolders } = todoFoldersSlice.actions;

const server = setupServer(
  http.get('/api/todo', () => {
    return HttpResponse.json({
      data: { items: [], count: 0 },
    });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('components/MenuMain', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <MenuMain />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
  });

  it('should have correct menu items', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
    ];
    const mockedMenu = vi.spyOn(Menu, 'Menu');
    expect(mockedMenu).toBeCalledTimes(0);

    const store = mockStore();
    store.dispatch(setFolders(testData));

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <MenuMain />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(mockedMenu).toBeCalledTimes(1);

    const props = mockedMenu.mock.calls[0][0];
    const itemdId = props.items.map((item) => item.id);
    expect(itemdId).toEqual(['', 'A', 'B', 'create']);
    expect(props.items[0].active).toEqual(true); // default selected item
  });

  it('should set filtered folder as active', async () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
    ];
    const mockedMenu = vi.spyOn(Menu, 'Menu');
    expect(mockedMenu).toBeCalledTimes(0);

    const store = mockStore();
    store.dispatch(setFolders(testData));
    await store.dispatch(filterTodos({ folder: 'B' }));

    render(
      withMockedProviders(
        <Provider store={store}>
          <MenuMain />
        </Provider>,
      ),
    );
    expect(mockedMenu).toBeCalledTimes(1);

    const props = mockedMenu.mock.calls[0][0];
    const active = props.items.filter((item) => item.active);
    expect(active.length).toEqual(1);
    expect(active[0].id).toEqual('B');
  });
});

import React from 'react';
import { t } from 'i18next';
import { Provider } from 'react-redux';

import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { act, fireEvent, render } from '@testing-library/react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { TodoListSearch } from 'components/todo-list/TodoListSearch';

import { client } from 'client';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

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

const getTodoListSearch = (): JSX.Element => {
  const store = mockStore();

  return withMockedProviders(
    <Provider store={store}>
      <TodoListSearch />
    </Provider>,
  );
};

describe('components/todo-list/TodoListSearch', () => {
  it('should render correctly', () => {
    const { container } = render(getTodoListSearch());
    expect(container).toMatchSnapshot();
  });

  it('should not search todos without query', async () => {
    const mockedTodoFetch = vi.spyOn(client.todo, 'get');
    const tree = render(getTodoListSearch());

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('');

    const submitButton = tree.getByRole('button', {
      name: (value) => value.includes(t('todoList.search')),
    });
    expect(submitButton).toBeInTheDocument();

    // trigger search
    await act(() => {
      fireEvent.click(submitButton);
    });

    expect(mockedTodoFetch).toBeCalledTimes(0);
  });

  it('should search todos by given query', async () => {
    const mockedTodoFetch = vi.spyOn(client.todo, 'get');
    const tree = render(getTodoListSearch());

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('');

    if (input) {
      await act(() => {
        fireEvent.change(input, { target: { value: 'Changed' } });
      });
      expect(input.value).toEqual('Changed');
    }

    const submitButton = tree.getByRole('button', {
      name: (value) => value.includes(t('todoList.search')),
    });
    expect(submitButton).toBeInTheDocument();

    // trigger search
    await act(() => {
      fireEvent.click(submitButton);
    });
    expect(mockedTodoFetch).toBeCalledTimes(1);

    expect(mockedTodoFetch).lastCalledWith(
      expect.objectContaining({ query: 'Changed' }),
    );
  });

  it('should clear query', async () => {
    const mockedTodoFetch = vi.spyOn(client.todo, 'get');
    const tree = render(getTodoListSearch());

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('');

    if (input) {
      await act(() => {
        fireEvent.change(input, { target: { value: 'Changed' } });
      });
      expect(input.value).toEqual('Changed');
    }

    const clearButton = tree.getByRole('button', {
      name: (value) => value.includes(t('cancel')),
    });
    expect(clearButton).toBeInTheDocument();

    // trigger search clear
    await act(() => {
      fireEvent.click(clearButton);
    });
    expect(mockedTodoFetch).toBeCalledTimes(1);

    expect(mockedTodoFetch).lastCalledWith(
      expect.objectContaining({ query: '' }),
    );
  });
});

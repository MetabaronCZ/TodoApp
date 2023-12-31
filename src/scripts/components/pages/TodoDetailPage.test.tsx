import React from 'react';
import * as Router from 'react-router';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Loader } from 'components/common/Loader';
import { TodoDetail } from 'components/todo-detail/TodoDetail';
import { TodoDetailPage } from 'components/pages/TodoDetailPage';

import { client } from 'client';
import { Todo } from 'models/Todo';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

vi.mock('components/common/Loader');
vi.mock('components/todo-detail/TodoDetail');

const testData: Todo = {
  id: 'test123',
  title: 'Todo A',
  description: '',
  created: 0,
  folder: null,
  isDone: false,
};
const errorMessage = 'Mocked error!';

// mock TodoDetail implementaion
vi.mocked(TodoDetail).mockImplementation(({ data, fetchError }) => {
  return fetchError
    ? 'TODO_ERROR'
    : data
    ? `TODO_DETAIL:${data.id}`
    : 'TODO_CREATE';
});

const getTodoDetailPage = (): JSX.Element => {
  const store = mockStore();
  return withMockedProviders(
    <Provider store={store}>
      <TodoDetailPage />
    </Provider>,
  );
};

describe('components/pages/TodoDetailPage', () => {
  it('should show Loader', () => {
    const mocked = vi.mocked(Loader);
    expect(mocked).toBeCalledTimes(0);

    render(getTodoDetailPage());
    expect(mocked).toBeCalledTimes(1);
  });

  it('should render error when no ID param', async () => {
    const tree = render(getTodoDetailPage());
    await tree.findByText('TODO_ERROR');
    expect(tree.container).toMatchSnapshot();
  });

  it('should render Todo detail with given ID', async () => {
    const testId = testData.id;
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: testId });

    const mockedFetch = vi
      .spyOn(client.todo, 'getDetail')
      .mockImplementation(() => Promise.resolve(testData));

    const tree = render(getTodoDetailPage());
    await tree.findByText(`TODO_DETAIL:${testId}`);

    expect(tree.container).toMatchSnapshot();
    expect(mockedFetch).toBeCalledTimes(1);
  });

  it('should render error on invalid ID', async () => {
    const testId = testData.id;
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: testId });

    const mockedFetch = vi
      .spyOn(client.todo, 'getDetail')
      .mockImplementation(() => Promise.reject(errorMessage));

    const tree = render(getTodoDetailPage());
    await tree.findByText('TODO_ERROR');

    expect(tree.container).toMatchSnapshot();
    expect(mockedFetch).toBeCalledTimes(1);
  });
});

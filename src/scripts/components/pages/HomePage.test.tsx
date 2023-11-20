import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { HomePage } from 'components/pages/HomePage';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';
import * as actionsModule from 'store/todos/actions';

const getHomepage = (searchParams?: Record<string, string>): JSX.Element => {
  const store = mockStore();
  const search = new URLSearchParams(searchParams);

  return withMockedProviders(
    <Provider store={store}>
      <HomePage />
    </Provider>,
    {
      url: search ? `?${search.toString()}` : null,
    },
  );
};

describe('components/pages/HomePage', () => {
  it('should render correctly', async () => {
    const { container } = render(getHomepage());
    expect(container).toMatchSnapshot();
  });

  it('should call refetch when no folder param given', async () => {
    const mockedFetch = vi.spyOn(actionsModule, 'fetchTodos');
    const mockedFilter = vi.spyOn(actionsModule, 'filterTodos');
    expect(mockedFetch).not.toBeCalled();
    expect(mockedFilter).not.toBeCalled();

    render(getHomepage());
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mockedFilter).not.toBeCalled();
  });

  it('should filter items when folder param given', async () => {
    const mockedFetch = vi.spyOn(actionsModule, 'fetchTodos');
    const mockedFilter = vi.spyOn(actionsModule, 'filterTodos');
    expect(mockedFetch).not.toBeCalled();
    expect(mockedFilter).not.toBeCalled();

    render(getHomepage({ folder: 'TEST' }));
    expect(mockedFetch).not.toBeCalled();

    expect(mockedFilter).toBeCalledTimes(1);
    expect(mockedFilter).lastCalledWith(
      expect.objectContaining({ folder: 'TEST' }),
    );
  });
});

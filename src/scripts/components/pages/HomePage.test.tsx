import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

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
    const mockedFetch = jest.spyOn(actionsModule, 'fetchTodos');
    const mockedFilter = jest.spyOn(actionsModule, 'filterTodos');
    expect(mockedFetch.mock.calls.length).toEqual(0);
    expect(mockedFilter.mock.calls.length).toEqual(0);

    render(getHomepage());
    expect(mockedFetch.mock.calls.length).toEqual(1);
    expect(mockedFilter.mock.calls.length).toEqual(0);
  });

  it('should filter items when folder param given', async () => {
    const mockedFetch = jest.spyOn(actionsModule, 'fetchTodos');
    const mockedFilter = jest.spyOn(actionsModule, 'filterTodos');
    expect(mockedFetch.mock.calls.length).toEqual(0);
    expect(mockedFilter.mock.calls.length).toEqual(0);

    render(getHomepage({ folder: 'TEST' }));
    expect(mockedFetch.mock.calls.length).toEqual(0);
    expect(mockedFilter.mock.calls.length).toEqual(1);
    expect(mockedFilter.mock.calls[0][0].folder).toEqual('TEST');
  });
});

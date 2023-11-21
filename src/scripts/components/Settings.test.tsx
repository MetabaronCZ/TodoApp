import React from 'react';
import { Provider } from 'react-redux';

import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { act, render } from '@testing-library/react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Settings } from 'components/Settings';
import * as Dropdown from 'components/forms/Dropdown';

import { client } from 'client';
import { perPages } from 'models/Settings';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const server = setupServer(
  http.post('/api/settings', () => {
    return HttpResponse.json();
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const getSettings = (): JSX.Element => {
  const store = mockStore();
  return withMockedProviders(
    <Provider store={store}>
      <Settings />
    </Provider>,
  );
};

describe('components/Settings', () => {
  it('should render correctly', () => {
    const mockedDropdown = vi.spyOn(Dropdown, 'Dropdown');
    expect(mockedDropdown).toBeCalledTimes(0);

    const { container } = render(getSettings());
    expect(container).toMatchSnapshot();
    expect(mockedDropdown).toBeCalledTimes(1);

    const props = mockedDropdown.mock.calls[0][0];
    expect(props.items.length).toEqual(perPages.length);
  });

  it('should auto-update settings when perPage changes', async () => {
    const testPerPage = 50;

    const mockedDropdown = vi.spyOn(Dropdown, 'Dropdown');
    const mockedUpdateSettings = vi.spyOn(client.settings, 'set');
    expect(mockedDropdown).toBeCalledTimes(0);
    expect(mockedUpdateSettings).toBeCalledTimes(0);

    render(getSettings());
    expect(mockedDropdown).toBeCalledTimes(1);

    await act(() => {
      const props = mockedDropdown.mock.calls[0][0];
      props.onSelect(testPerPage);
    });

    expect(mockedUpdateSettings).toBeCalledTimes(1);
    expect(mockedUpdateSettings).toBeCalledWith({ perPage: testPerPage });
  });
});

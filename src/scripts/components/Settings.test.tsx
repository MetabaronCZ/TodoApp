import React from 'react';
import { Provider } from 'react-redux';

import { act, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Settings } from 'components/Settings';
import { Dropdown } from 'components/forms/Dropdown';

import { mockStore } from 'test/store';
import { client } from 'modules/client';
import { perPages } from 'models/Settings';
import { withMockedProviders } from 'test/component';

jest.mock('components/forms/Dropdown');

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
    const mockedDropdown = jest.mocked(Dropdown);
    expect(mockedDropdown).toBeCalledTimes(0);

    const { container } = render(getSettings());
    expect(container).toMatchSnapshot();
    expect(mockedDropdown).toBeCalledTimes(1);

    const props = mockedDropdown.mock.calls[0][0];
    expect(props.items.length).toEqual(perPages.length);
  });

  it('should auto-update settings when perPage changes', async () => {
    const testPerPage = 50;

    const mockedDropdown = jest.mocked(Dropdown);
    const mockedUpdateSettings = jest.spyOn(client.settings, 'set');
    expect(mockedDropdown).toBeCalledTimes(0);
    expect(mockedUpdateSettings).toBeCalledTimes(0);

    render(getSettings());
    expect(mockedDropdown).toBeCalledTimes(1);

    act(() => {
      const props = mockedDropdown.mock.calls[0][0];
      props.onSelect(testPerPage);
    });

    expect(mockedUpdateSettings).toBeCalledTimes(1);
    expect(mockedUpdateSettings).toBeCalledWith({ perPage: testPerPage });
  });
});

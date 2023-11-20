import React from 'react';
import { Provider } from 'react-redux';

import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as Loader from 'components/common/Loader';
import { Initialization } from 'components/Initialization';

import { client } from 'client';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const renderInitialization = (children?: React.ReactNode): JSX.Element => {
  const store = mockStore();

  return withMockedProviders(
    <Provider store={store}>
      <Initialization>{children}</Initialization>
    </Provider>,
  );
};

describe('components/Initialization', () => {
  it('should render correctly', async () => {
    const tree = await act(() => {
      return render(renderInitialization(<div>CONTENT</div>));
    });
    await tree.findByText('CONTENT');
    expect(tree.container).toMatchSnapshot();
  });

  it('should call initial endpoints', async () => {
    const mockedLoader = vi.spyOn(Loader, 'Loader');
    const mockedFetchFolders = vi.spyOn(client.folder, 'get');
    const mockedFetchSettings = vi.spyOn(client.settings, 'get');

    expect(mockedLoader).toBeCalledTimes(0);
    expect(mockedFetchFolders).toBeCalledTimes(0);
    expect(mockedFetchSettings).toBeCalledTimes(0);

    await act(() => render(renderInitialization()));
    expect(mockedLoader).toBeCalledTimes(1);
    expect(mockedFetchFolders).toBeCalledTimes(1);
    expect(mockedFetchSettings).toBeCalledTimes(1);
  });
});

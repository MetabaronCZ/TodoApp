import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

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
    const tree = render(renderInitialization(<div>CONTENT</div>));
    await tree.findByText('CONTENT');
    expect(tree.container).toMatchSnapshot();
  });

  it('should call initial endpoints', () => {
    const mockedLoader = jest.spyOn(Loader, 'Loader');
    const mockedFetchFolders = jest.spyOn(client.folder, 'get');
    const mockedFetchSettings = jest.spyOn(client.settings, 'get');

    expect(mockedLoader).toBeCalledTimes(0);
    expect(mockedFetchFolders).toBeCalledTimes(0);
    expect(mockedFetchSettings).toBeCalledTimes(0);

    render(renderInitialization());
    expect(mockedLoader).toBeCalledTimes(1);
    expect(mockedFetchFolders).toBeCalledTimes(1);
    expect(mockedFetchSettings).toBeCalledTimes(1);
  });
});

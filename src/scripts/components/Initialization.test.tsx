import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Loader } from 'components/common/Loader';
import { Initialization } from 'components/Initialization';

import { mockStore } from 'test/store';
import { client } from 'modules/client';
import { withMockedProviders } from 'test/component';

jest.mock('components/common/Loader');

const renderInitialization = (children?: React.ReactNode): JSX.Element => {
  const store = mockStore();

  return withMockedProviders(
    <Provider store={store}>
      <Initialization>{children}</Initialization>
    </Provider>,
  );
};

describe('components/Initialization', () => {
  it('should render correctly', () => {
    const { container } = render(renderInitialization());
    expect(container).toMatchSnapshot();
  });

  it('should render children', async () => {
    const tree = render(renderInitialization(<div>CONTENT</div>));

    await tree.findByText('CONTENT');
    expect(tree.container).toMatchSnapshot();
  });

  it('should call initial endpoints', () => {
    const mockedLoader = jest.mocked(Loader);
    const mockedFetchFolders = jest.spyOn(client.folder, 'get');
    const mockedFetchSettings = jest.spyOn(client.settings, 'get');

    expect(mockedLoader).toHaveBeenCalledTimes(0);
    expect(mockedFetchFolders).toHaveBeenCalledTimes(0);
    expect(mockedFetchSettings).toHaveBeenCalledTimes(0);

    render(renderInitialization());
    expect(mockedLoader).toHaveBeenCalledTimes(1);
    expect(mockedFetchFolders).toHaveBeenCalledTimes(1);
    expect(mockedFetchSettings).toHaveBeenCalledTimes(1);
  });
});

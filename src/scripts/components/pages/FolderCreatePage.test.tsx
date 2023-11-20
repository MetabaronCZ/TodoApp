import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FolderCreatePage } from 'components/pages/FolderCreatePage';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

describe('components/pages/FolderCreatePage', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <FolderCreatePage />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

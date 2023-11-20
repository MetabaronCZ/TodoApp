import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FolderListPage } from 'components/pages/FolderListPage';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

describe('components/pages/FolderListPage', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <FolderListPage />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

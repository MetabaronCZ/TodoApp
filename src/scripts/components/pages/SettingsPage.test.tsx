import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SettingsPage } from 'components/pages/SettingsPage';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

describe('components/pages/SettingsPage', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <SettingsPage />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

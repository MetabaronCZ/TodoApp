import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TodoCreatePage } from 'components/pages/TodoCreatePage';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

describe('components/pages/TodoCreatePage', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const { container } = render(
      withMockedProviders(
        <Provider store={store}>
          <TodoCreatePage />
        </Provider>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

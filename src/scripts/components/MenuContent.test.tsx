import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { MenuContent } from 'components/MenuContent';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

describe('components/MenuContent', () => {
  it('should render correctly', () => {
    const store = mockStore();

    const tree = render(
      withMockedProviders(
        <Provider store={store}>
          <MenuContent>
            <div>CONTENT</div>
          </MenuContent>
        </Provider>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});

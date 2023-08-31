import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { MenuContent } from 'components/MenuContent';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const renderMenuContent = (children?: React.ReactNode): JSX.Element => {
  const store = mockStore();

  return withMockedProviders(
    <Provider store={store}>
      <MenuContent>{children}</MenuContent>
    </Provider>,
  );
};

describe('components/MenuContent', () => {
  it('should render correctly', () => {
    const { container } = render(renderMenuContent());
    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const tree = render(renderMenuContent(<div>CONTENT</div>));

    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});

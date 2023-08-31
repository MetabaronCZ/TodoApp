import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Page } from 'components/Page';
import { withMockedProviders } from 'test/component';

describe('components/Page', () => {
  it('should render correctly', () => {
    expect(document.title).toEqual('');

    const { container } = render(
      withMockedProviders(<Page title="Test page" />),
    );
    expect(container).toMatchSnapshot();
    expect(document.title).toEqual('Test page');
  });

  it('should render children', () => {
    const tree = render(
      withMockedProviders(
        <Page title="Test page">
          <div>CONTENT</div>
        </Page>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});
